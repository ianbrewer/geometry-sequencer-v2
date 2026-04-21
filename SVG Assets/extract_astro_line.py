import xml.etree.ElementTree as ET
import re
import os
import glob

svg_file = 'visual Assets/astro_line.svg'
out_dir = 'visual Assets/astro_line_extracted'
os.makedirs(out_dir, exist_ok=True)

for f in glob.glob(f"{out_dir}/*"):
    os.remove(f)

tree = ET.parse(svg_file)
root = tree.getroot()

ns = {'svg': 'http://www.w3.org/2000/svg'}
for elem in root.iter():
    if '}' in elem.tag:
        elem.tag = elem.tag.split('}', 1)[1]

paths = root.findall('.//path')
print(f"Found {len(paths)} paths")

signs = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
]

def get_bbox_points(path_elem):
    d = path_elem.attrib.get('d', '')
    nums = list(map(float, re.findall(r'-?\d+\.?\d*', d)))
    pts = []
    for i in range(0, len(nums)-1, 2):
        pts.append((nums[i], nums[i+1]))
    if not pts:
        return None, None, None, None
    min_x = min(x for x,y in pts)
    max_x = max(x for x,y in pts)
    min_y = min(y for x,y in pts)
    max_y = max(y for x,y in pts)
    return min_x, max_x, min_y, max_y

max_w = 0
max_h = 0
for i, p in enumerate(paths):
    if i >= len(signs): break
    min_x, max_x, min_y, max_y = get_bbox_points(p)
    if min_x is None: continue
    w = max_x - min_x
    h = max_y - min_y
    if w > max_w: max_w = w
    if h > max_h: max_h = h

# Set a fixed reasonable padding, like 10px instead of scaling hugely
padding_x = 10
padding_y = 10

global_svg_w = max_w + 2 * padding_x
global_svg_h = max_h + 2 * padding_y

html_items = ""

for i, p in enumerate(paths):
    if i >= len(signs):
        break
    sign_name = signs[i]
    min_x, max_x, min_y, max_y = get_bbox_points(p)
    if min_x is None: continue
    
    cx = (min_x + max_x) / 2
    cy = (min_y + max_y) / 2
    
    svg_w = global_svg_w
    svg_h = global_svg_h
    
    out_svg = ET.Element('svg', {
        'xmlns': 'http://www.w3.org/2000/svg',
        'width': str(svg_w),
        'height': str(svg_h),
        'viewBox': f"0 0 {svg_w} {svg_h}",
        'overflow': 'visible'
    })
    
    group_cx = svg_w / 2
    group_cy = svg_h / 2
    
    transform_str = f"translate({group_cx}, {group_cy}) translate({-cx}, {-cy})"
    
    g_wrapper = ET.SubElement(out_svg, 'g', {'transform': transform_str})
    p_clone = ET.Element('path')
    p_clone.attrib['d'] = p.attrib.get('d', '')
    p_clone.attrib['fill'] = 'none'
    p_clone.attrib['stroke'] = '#8667A5'
    p_clone.attrib['stroke-width'] = '2'
    p_clone.attrib['stroke-linecap'] = 'round'
    p_clone.attrib['stroke-linejoin'] = 'round'
    g_wrapper.append(p_clone)
    
    filename = f"{i+1:02d}_{sign_name}.svg"
    ET.ElementTree(out_svg).write(f"{out_dir}/{filename}", encoding='utf-8', xml_declaration=True)
    
    html_items += f'''
        <div class="item">
            <img src="{filename}" alt="{sign_name}" />
            <div class="label">{filename}</div>
        </div>
    '''

html_content = f"""<!DOCTYPE html>
<html>
<head>
<title>Astro Lined Extracted Preview</title>
<style>
    body {{ font-family: sans-serif; background: #f5f5f5; margin: 20px; }}
    .grid {{ display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }}
    .item {{ background: white; padding: 10px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }}
    img {{ max-width: 100%; height: 120px; object-fit: contain; }}
    .label {{ margin-top: 10px; font-weight: bold; color: #333; }}
</style>
</head>
<body>
    <h1>Extracted Astro Line Drawings</h1>
    <div class="grid">
{html_items}
    </div>
</body>
</html>
"""
with open(f"{out_dir}/preview.html", 'w') as f:
    f.write(html_content)

print(f"Processed 12 SVG files into Lined version.")
