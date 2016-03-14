# -*- coding: utf-8 -*-
#
# Created on 14/03/16
# @author: chrigu <christian.cueni@gmail.ccom>
import plistlib
import io
import json

files = ['regular', 'irregular']

for file in files:
    p_list = plistlib.readPlist("%s.plist"%file)
    json_data = json.dumps(p_list)

    with io.open('filename', 'w', encoding='utf8') as json_file:
        data = json.dumps(p_list, ensure_ascii=False)
        # unicode(data) auto-decodes data to unicode if str
        json_file.write(data)

