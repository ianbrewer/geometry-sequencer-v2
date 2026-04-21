import xml.etree.ElementTree as ET
import re
import math
import os

svg_file = 'visual Assets/amino.svg'
out_dir = 'visual Assets/amino_extracted'
os.makedirs(out_dir, exist_ok=True)

tree = ET.parse(svg_file)
root = tree.getroot()

# Namespaces
ns = {'svg': 'http://www.w3.org/2000/svg'}
# Strip namespaces for easier querying
for elem in root.iter():
    if '}' in elem.tag:
        elem.tag = elem.tag.split('}', 1)[1]

# Find all <g id="Frame..."> using a simple check
frames = []
for g in root.findall('.//g'):
    if g.attrib.get('id', '').startswith('Frame'):
        frames.append(g)

print(f"Found {len(frames)} frames")

def get_bbox(elem):
    min_x, min_y = float('inf'), float('inf')
    max_x, max_y = float('-inf'), float('-inf')
    
    for path in elem.findall('.//path'):
        d = path.attrib.get('d', '')
        nums = list(map(float, re.findall(r'-?\d+\.?\d*', d)))
        for i in range(0, len(nums)-1, 2):
            x, y = nums[i], nums[i+1]
            min_x = min(min_x, x)
            max_x = max(max_x, x)
            min_y = min(min_y, y)
            max_y = max(max_y, y)
    return min_x, max_x, min_y, max_y

all_centers = []
for f in frames:
    min_x, max_x, min_y, max_y = get_bbox(f)
    cx = (min_x + max_x) / 2
    cy = (min_y + max_y) / 2
    all_centers.append((cx, cy))

ring_cx = sum(x for x,y in all_centers) / len(all_centers)
ring_cy = sum(y for x,y in all_centers) / len(all_centers)

print(f"Ring center: ({ring_cx}, {ring_cy})")

for i, f in enumerate(frames):
    min_x, max_x, min_y, max_y = get_bbox(f)
    if min_x == float('inf'):
        print(f"Frame {i+1} has no valid paths, skipping...")
        continue
        
    cx = (min_x + max_x) / 2
    cy = (min_y + max_y) / 2
    
    dx = cx - ring_cx
    dy = cy - ring_cy
    angle_rad = math.atan2(dy, dx)
    angle_deg = math.degrees(angle_rad)
    
    # Default unrotate: align vector from center to point upwards
    # Adjust as needed if they initially point inwards or sideways
    rotation_needed = -90 - angle_deg
    
    width = max_x - min_x
    height = max_y - min_y
    
    padding = max(width, height) * 0.5
    
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
    
    transform_str = f"translate({group_cx}, {group_cy}) rotate({rotation_needed}) translate({-cx}, {-cy})"
    
    g_wrapper = ET.SubElement(out_svg, 'g', {'transform': transform_str})
    g_wrapper.append(f)
    
    if 'clip-path' in f.attrib:
        del f.attrib['clip-path']
        
    ET.ElementTree(out_svg).write(f"{out_dir}/amino_{i+1:02d}.svg", encoding='utf-8', xml_declaration=True)
    
print("Extraction complete!")
