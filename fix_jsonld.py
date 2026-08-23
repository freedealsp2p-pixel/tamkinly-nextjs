path = '/var/www/tamkinly/src/app/page.tsx'
with open(path, 'r') as f:
    lines = f.readlines()

new_lines = []
skip_next = 0
for i, line in enumerate(lines):
    if skip_next > 0:
        skip_next -= 1
        continue
    if '<DefaultJsonLd />' in line and i > 890:
        # Also remove the comment line before it
        if new_lines and 'JSON-LD' in new_lines[-1]:
            new_lines.pop()
        continue
    new_lines.append(line)

with open(path, 'w') as f:
    f.writelines(new_lines)

print(f'Removed DefaultJsonLd from homepage. Lines: {len(lines)} -> {len(new_lines)}')