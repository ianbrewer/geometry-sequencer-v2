import xml.etree.ElementTree as ET
import re
import math
import os
import glob

# The problem with the previous script was that it didn't shift the coordinates back to 0,0 locally
# This meant the SVG paths were rendering off-canvas if standard viewBox limits applied
# In this version, we will recalculate path coordinates relative to the path's bounding box and un-rotate properly.

svg_file = 'visual Assets/astro.svg'
out_dir = 'visual Assets/astro_lined'
os.makedirs(out_dir, exist_ok=True)

# Delete existing
for f in glob.glob(f"{out_dir}/*"):
    os.remove(f)

tree = ET.parse(svg_file)
root = tree.getroot()

ns = {'svg': 'http://www.w3.org/2000/svg'}
for elem in root.iter():
    if '}' in elem.tag:
        elem.tag = elem.tag.split('}', 1)[1]

paths = root.findall('./path')
print(f"Found {len(paths)} paths")

def get_bbox_points(path_elem):
    d = path_elem.attrib.get('d', '')
    nums = list(map(float, re.findall(r'-?\d+\.?\d*', d)))
    pts = []
    for i in range(0, len(nums)-1, 2):
        pts.append((nums[i], nums[i+1]))
    
    if not pts:
        return None, None, None, None, pts
        
    min_x = min(x for x,y in pts)
    max_x = max(x for x,y in pts)
    min_y = min(y for x,y in pts)
    max_y = max(y for x,y in pts)
    
    return min_x, max_x, min_y, max_y, pts

all_centers = []
path_data = []

for p in paths:
    min_x, max_x, min_y, max_y, pts = get_bbox_points(p)
    if pts:
        cx = (min_x + max_x) / 2
        cy = (min_y + max_y) / 2
        all_centers.append((cx, cy))
        path_data.append({
            'elem': p,
            'pts': pts,
            'd': p.attrib.get('d', ''),
            'cx': cx,
            'cy': cy,
            'min_x': min_x,
            'max_x': max_x,
            'min_y': min_y,
            'max_y': max_y
        })

ring_cx = sum(x for x,y in all_centers) / len(all_centers)
ring_cy = sum(y for x,y in all_centers) / len(all_centers)
print(f"Ring center: ({ring_cx}, {ring_cy})")

def rotate_point(x, y, angle_rad):
    rx = x * math.cos(angle_rad) - y * math.sin(angle_rad)
    ry = x * math.sin(angle_rad) + y * math.cos(angle_rad)
    return rx, ry

for i, pd in enumerate(path_data):
    cx = pd['cx']
    cy = pd['cy']
    
    dx = cx - ring_cx
    dy = cy - ring_cy
    angle_rad = math.atan2(dy, dx)
    angle_deg = math.degrees(angle_rad)
    
    # we want to rotate points locally 
    rotation_needed_rad = math.radians(-90 - angle_deg)
    
    rotated_pts = []
    for x, y in pd['pts']:
        # local space
        lx = x - cx
        ly = y - cy
        # rotate
        rx, ry = rotate_point(lx, ly, rotation_needed_rad)
        rotated_pts.append((rx, ry))
        
    # Get new bounds
    n_min_x = min(x for x,y in rotated_pts)
    n_max_x = max(x for x,y in rotated_pts)
    n_min_y = min(y for x,y in rotated_pts)
    n_max_y = max(y for x,y in rotated_pts)
    
    width = n_max_x - n_min_x
    height = n_max_y - n_min_y
    
    padding = max(width, height) * 0.5
    if padding == 0:
        padding = 10
        
    svg_w = width + 2*padding
    svg_h = height + 2*padding
    
    group_cx = svg_w / 2
    group_cy = svg_h / 2
    
    # We will adjust the path string directly
    # To do this safely for all SVG commands, we'll just reconstruct the path with simple commands, 
    # but it's much easier to use an SVG transform that combines the translate and rotate into one matrix 
    # OR we use the previous approach but just fix the bounding box.
    # Actually, the problem with the previous approach wasn't the transform, it was that the path `fill="none"` 
    # but some strokes or views might be clipped. Let's do the transform properly in <g> exactly matching centers.
    
    out_svg = ET.Element('svg', {
        'xmlns': 'http://www.w3.org/2000/svg',
        'width': str(svg_w),
        'height': str(svg_h),
        'viewBox': f"0 0 {svg_w} {svg_h}",
        'overflow': 'visible'
    })
    
    # Clean transform:
    # 1. Move from path global coordinates to origin (-cx, -cy)
    # 2. Rotate 
    # 3. Move to new SVG center
    rotation_needed_deg = -90 - angle_deg
    transform_str = f"translate({group_cx}, {group_cy}) rotate({rotation_needed_deg}) translate({-cx}, {-cy})"
    
    g_wrapper = ET.SubElement(out_svg, 'g', {'transform': transform_str})
    
    p_clone = ET.Element('path')
    p_clone.attrib['d'] = pd['d']
    p_clone.attrib['fill'] = 'none'
    p_clone.attrib['stroke'] = '#8667A5'
    p_clone.attrib['stroke-width'] = '2'
    p_clone.attrib['stroke-linecap'] = 'round'
    p_clone.attrib['stroke-linejoin'] = 'round'
    
    g_wrapper.append(p_clone)
    
    ET.ElementTree(out_svg).write(f"{out_dir}/astro_{i+1:02d}.svg", encoding='utf-8', xml_declaration=True)

html_content = """<!DOCTYPE html>
<html>
<head>
<title>Astro Lined Preview</title>
<style>
    body { font-family: sans-serif; background: #f5f5f5; margin: 20px; }
    .grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; }
    .item { background: white; padding: 10px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    img { max-width: 100%; height: 100px; object-fit: contain; }
    .label { margin-top: 10px; font-weight: bold; color: #333; }
</style>
</head>
<body>
    <h1>Extracted Astro Lined</h1>
    <div class="grid">
"""
sorted_svgs = sorted([os.path.basename(s) for s in glob.glob(f"{out_dir}/*.svg")])
for s in sorted_svgs:
    html_content += f"""
        <div class="item">
            <img src="{s}" alt="{s}" />
            <div class="label">{s}</div>
        </div>
    """
html_content += """
    </div>
</body>
</html>
"""
with open(f"{out_dir}/preview.html", 'w') as f:
    f.write(html_content)

print(f"Processed {len(path_data)} SVG files into Lined version.")
