import xml.etree.ElementTree as ET
import re
import math
import os

svg_file = 'visual Assets/astro.svg'
out_dir = 'visual Assets/astro_extracted'
os.makedirs(out_dir, exist_ok=True)

tree = ET.parse(svg_file)
root = tree.getroot()

# Namespaces
ns = {'svg': 'http://www.w3.org/2000/svg'}
for elem in root.iter():
    if '}' in elem.tag:
        elem.tag = elem.tag.split('}', 1)[1]

# In astro.svg, the symbols are direct children <path> elements
paths = root.findall('./path')

print(f"Found {len(paths)} paths")

def get_bbox(path_elem):
    min_x, min_y = float('inf'), float('inf')
    max_x, max_y = float('-inf'), float('-inf')
    
    d = path_elem.attrib.get('d', '')
    nums = list(map(float, re.findall(r'-?\d+\.?\d*', d)))
    # SVG path d attributes might have varied commands but coordinates usually appear in pairs
    # Note: this is a simple approximation assuming x,y pair succession, since there are arcs/curves 
    # it might not perfectly bound if curves exceed endpoints, but it's usually good enough for finding centers.
    for i in range(0, len(nums)-1, 2):
        x, y = nums[i], nums[i+1]
        min_x = min(min_x, x)
        max_x = max(max_x, x)
        min_y = min(min_y, y)
        max_y = max(max_y, y)
    return min_x, max_x, min_y, max_y

all_centers = []
for p in paths:
    min_x, max_x, min_y, max_y = get_bbox(p)
    cx = (min_x + max_x) / 2
    cy = (min_y + max_y) / 2
    all_centers.append((cx, cy))

ring_cx = sum(x for x,y in all_centers) / len(all_centers)
ring_cy = sum(y for x,y in all_centers) / len(all_centers)

print(f"Ring center: ({ring_cx}, {ring_cy})")

for i, p in enumerate(paths):
    min_x, max_x, min_y, max_y = get_bbox(p)
    if min_x == float('inf'):
        print(f"Path {i+1} has no valid boundaries, skipping...")
        continue
        
    cx = (min_x + max_x) / 2
    cy = (min_y + max_y) / 2
    
    dx = cx - ring_cx
    dy = cy - ring_cy
    angle_rad = math.atan2(dy, dx)
    angle_deg = math.degrees(angle_rad)
    
    rotation_needed = -90 - angle_deg
    
    width = max_x - min_x
    height = max_y - min_y
    
    padding = max(width, height) * 0.5
    if padding == 0:
        padding = 10
    
    svg_w = width + 2*padding
    svg_h = height + 2*padding
    
    out_svg = ET.Element('svg', {
        'xmlns': 'http://www.w3.org/2000/svg',
        'width': str(svg_w),
        'height': str(svg_h),
        'viewBox': f"0 0 {svg_w} {svg_h}"
    })
    
    group_cx = svg_w / 2
    group_cy = svg_h / 2
    
    # un-rotate and center
    transform_str = f"translate({group_cx}, {group_cy}) rotate({rotation_needed}) translate({-cx}, {-cy})"
    
    g_wrapper = ET.SubElement(out_svg, 'g', {'transform': transform_str})
    g_wrapper.append(p)
    
    ET.ElementTree(out_svg).write(f"{out_dir}/astro_{i+1:02d}.svg", encoding='utf-8', xml_declaration=True)

html_content = """<!DOCTYPE html>
<html>
<head>
<title>Astro Symbols Preview</title>
<style>
    body { font-family: sans-serif; background: #f5f5f5; margin: 20px; }
    .grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; }
    .item { background: white; padding: 10px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    img { max-width: 100%; height: 100px; object-fit: contain; }
    .label { margin-top: 10px; font-weight: bold; color: #333; }
</style>
</head>
<body>
    <h1>Extracted Astro Symbols</h1>
    <div class="grid">
"""
for i in range(len(paths)):
    num = f"{i+1:02d}"
    html_content += f"""
        <div class="item">
            <img src="astro_{num}.svg" alt="astro_{num}" />
            <div class="label">astro_{num}.svg</div>
        </div>
    """
html_content += """
    </div>
</body>
</html>
"""
with open(f"{out_dir}/preview.html", 'w') as f:
    f.write(html_content)

print("Extraction complete!")
