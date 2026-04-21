import xml.etree.ElementTree as ET
import re

svg_file = 'visual Assets/astro_line.svg'
tree = ET.parse(svg_file)
root = tree.getroot()
for elem in root.iter():
    if '}' in elem.tag:
        elem.tag = elem.tag.split('}', 1)[1]
paths = root.findall('.//path')

def get_bbox_points(path_elem):
    d = path_elem.attrib.get('d', '')
    nums = list(map(float, re.findall(r'-?\d+\.?\d*', d)))
    pts = []
    for i in range(0, len(nums)-1, 2):
        pts.append((nums[i], nums[i+1]))
    if not pts: return None, None, None, None
    min_x = min(x for x,y in pts)
    max_x = max(x for x,y in pts)
    min_y = min(y for x,y in pts)
    max_y = max(y for x,y in pts)
    return min_x, max_x, min_y, max_y

for i, p in enumerate(paths):
    min_x, max_x, min_y, max_y = get_bbox_points(p)
    print(f"Path {i}: w={max_x-min_x}, h={max_y-min_y}")
