# -*- coding: utf-8 -*-
#
# Created on 14/03/16
# @author: chrigu <christian.cueni@gmail.ccom>
import plistlib
import io
import json

files = ['regular', 'irregular']

data = {'verbTypes': ['Lorem', 'ipsum', 'some', 'other']}

for file in files:
    p_list = plistlib.readPlist("%s.plist"%file)
    data[file] = p_list


with io.open('combined.json', 'w', encoding='utf8') as json_file:
    json_data = json.dumps(data, sort_keys=True, indent=4, ensure_ascii=False)
    # unicode(data) auto-decodes data to unicode if str
    json_file.write(json_data)

