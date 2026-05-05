#!/usr/bin/env python3
"""
Optimize SVGs for PixiJS-friendly vectors:
  1. Convert 4-cubic-bezier circle paths to <circle> / <ellipse>.
  2. Quantize all numeric attribute values to the nearest 0.5.

Run: python3 scripts/optimize_svgs.py "SVG Assets/Other Icons"
"""
import re
import sys
from pathlib import Path

NUM_RE = r'-?\d+\.?\d*(?:[eE][+-]?\d+)?'

NUMERIC_ATTRS = {
    'd', 'transform', 'viewBox', 'points',
    'cx', 'cy', 'r', 'rx', 'ry',
    'x', 'y', 'x1', 'y1', 'x2', 'y2',
    'width', 'height',
    'stroke-width', 'stroke-miterlimit', 'stroke-dashoffset', 'stroke-dasharray',
    'fx', 'fy',
    'offset', 'opacity', 'fill-opacity', 'stroke-opacity',
}


def fmt_half(x):
    rounded = round(x * 2) / 2
    if rounded == int(rounded):
        return str(int(rounded))
    return f"{rounded:g}"


def round_numbers_in_string(s):
    return re.sub(NUM_RE, lambda m: fmt_half(float(m.group(0))), s)


def parse_path_d(d):
    """Tokenize path d into list of (cmd_letter, [floats])."""
    tokens = re.findall(r'[MmLlHhVvCcSsQqTtAaZz]|' + NUM_RE, d)
    cmds = []
    i = 0
    current_cmd = None
    while i < len(tokens):
        t = tokens[i]
        if re.match(r'[A-Za-z]', t):
            current_cmd = t
            i += 1
            nums = []
            while i < len(tokens) and not re.match(r'[A-Za-z]', tokens[i]):
                nums.append(float(tokens[i]))
                i += 1
            cmds.append((current_cmd, nums))
        else:
            # No leading letter (shouldn't happen for well-formed paths)
            i += 1
    return cmds


def try_circle(d, tol=1.0):
    """Detect M + 4*C + Z circle/ellipse pattern. Return tuple or None."""
    try:
        cmds = parse_path_d(d)
    except Exception:
        return None
    cmds_no_z = [c for c in cmds if c[0] not in 'Zz']
    if len(cmds_no_z) != 5:
        return None
    if cmds_no_z[0][0] != 'M':
        return None
    if any(c[0] != 'C' for c in cmds_no_z[1:]):
        return None
    if len(cmds_no_z[0][1]) < 2:
        return None
    x0, y0 = cmds_no_z[0][1][0], cmds_no_z[0][1][1]
    endpoints = [(x0, y0)]
    for c in cmds_no_z[1:]:
        if len(c[1]) < 6:
            return None
        endpoints.append((c[1][4], c[1][5]))
    # Closure check
    if abs(endpoints[4][0] - endpoints[0][0]) > tol or abs(endpoints[4][1] - endpoints[0][1]) > tol:
        return None
    pts = endpoints[:4]
    xs = [p[0] for p in pts]
    ys = [p[1] for p in pts]
    xmin, xmax = min(xs), max(xs)
    ymin, ymax = min(ys), max(ys)
    cx = (xmin + xmax) / 2
    cy = (ymin + ymax) / 2
    rx = (xmax - xmin) / 2
    ry = (ymax - ymin) / 2
    if rx < 1 or ry < 1:
        return None
    # Each cardinal must be hit exactly once
    on_left = [p for p in pts if abs(p[0] - xmin) < tol]
    on_right = [p for p in pts if abs(p[0] - xmax) < tol]
    on_top = [p for p in pts if abs(p[1] - ymin) < tol]
    on_bottom = [p for p in pts if abs(p[1] - ymax) < tol]
    if not (len(on_left) == 1 and len(on_right) == 1 and len(on_top) == 1 and len(on_bottom) == 1):
        return None
    # Cardinal points must lie on center axes
    if abs(on_left[0][1] - cy) > tol or abs(on_right[0][1] - cy) > tol:
        return None
    if abs(on_top[0][0] - cx) > tol or abs(on_bottom[0][0] - cx) > tol:
        return None
    if abs(rx - ry) < tol:
        return ('circle', cx, cy, (rx + ry) / 2)
    return ('ellipse', cx, cy, rx, ry)


def replace_circle_paths(text):
    """Find <path .../> elements and convert circle-shaped ones to <circle>/<ellipse>."""
    converted = 0

    def repl(m):
        nonlocal converted
        attrs = m.group(1)
        d_match = re.search(r'\bd="([^"]+)"', attrs)
        if not d_match:
            return m.group(0)
        d = d_match.group(1)
        result = try_circle(d)
        if result is None:
            return m.group(0)
        # Strip d (and fill-rule/clip-rule which are no-ops for circles) from attrs
        other = re.sub(r'\s*\b(?:d|fill-rule|clip-rule)="[^"]*"', '', attrs)
        # Normalize whitespace
        other = re.sub(r'\s+', ' ', other).strip()
        if other:
            other = ' ' + other
        if result[0] == 'circle':
            _, cx, cy, r = result
            converted += 1
            return f'<circle cx="{fmt_half(cx)}" cy="{fmt_half(cy)}" r="{fmt_half(r)}"{other}/>'
        else:
            _, cx, cy, rx, ry = result
            converted += 1
            return f'<ellipse cx="{fmt_half(cx)}" cy="{fmt_half(cy)}" rx="{fmt_half(rx)}" ry="{fmt_half(ry)}"{other}/>'

    text = re.sub(r'<path([^>]*?)/>', repl, text, flags=re.DOTALL)
    return text, converted


def round_attr_values(text):
    """Quantize numeric values inside whitelisted attributes."""
    def repl(m):
        name = m.group(1)
        val = m.group(2)
        if name in NUMERIC_ATTRS:
            return f'{name}="{round_numbers_in_string(val)}"'
        return m.group(0)
    return re.sub(r'\b([\w-]+)="([^"]*)"', repl, text)


def process(path):
    src = path.read_text()
    out, n_converted = replace_circle_paths(src)
    out = round_attr_values(out)
    if out != src:
        path.write_text(out)
    return n_converted, len(src), len(out)


def main():
    folder = Path(sys.argv[1])
    files = sorted(folder.glob("*.svg"))
    total_conv = 0
    for f in files:
        n, before, after = process(f)
        total_conv += n
        print(f"{f.name:45s}  paths→circles: {n:3d}  bytes: {before:6d} → {after:6d}")
    print(f"\nTotal path→circle conversions: {total_conv}")


if __name__ == '__main__':
    main()
