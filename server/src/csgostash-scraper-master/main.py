# -*- coding: utf-8 -*-

"""
MIT License

Copyright (c) 2020 supr3me

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
"""

import os
import pickle
import json
import logging

# from csgostash_scraper.modules.objects.souvenirpackage import SouvenirPackage
from csgostash_scraper.modules.objectfactory import CollectionFactory, ContainerFactory
from csgostash_scraper.modules.scraper import RetrieveCollection, RetrieveCase

logging.basicConfig(level=logging.INFO,
                    format='%(message)s',)


main_dir = os.getcwd()


def root_path():
    return os.path.abspath(main_dir)


data_path = os.path.join(root_path(), 'data')


def filename(name):
    name_replacements = {'II': '2',
                         ':': '',
                         ' ': '_'}

    for i in name_replacements:
        name = name.replace(i, name_replacements[i])

    return name.lower()


def fmt_dict(container):

    covert = []
    classified = []
    restricted = []
    milspec = []
    industrial = []
    consumer = []

    for item in container:
        if "★" not in item.name:
            itemdict = {"name": item.name,
                        "can_be_souvenir": item.can_be_souvenir,
                        "can_be_stattrak": item.can_be_stattrak,
                        "wears": item.wears}
            rar = { "Covert": covert,
                    "Classified": classified,
                    "Restricted": restricted,
                    "Mil-Spec": milspec,
                    "Industrial": industrial,
                    "Consumer": consumer}

            rar[item.rarity].append(itemdict)

    content = {"Covert Skins": covert,
               "Classified Skins": classified,
               "Restricted Skins": restricted,
               "Mil-Spec Skins": milspec,
               "Industrial Grade Skins": industrial,
               "Consumer Grade Skins": consumer}

    fmt_dict = {"name": container.name,
                "content": content}

    return fmt_dict


def save_data(*, obj='', save_to='', overwrite=False):
    """Retrieves data and saves it as a pickle and json"""

    # Set file save location
    object_retrieve = {
        "collections": RetrieveCollection,
        "cases": RetrieveCase
    }

    object_factory = {
        "collections": CollectionFactory.create_collection,
        "cases": ContainerFactory.create_case
    }

    object_retrieve = object_retrieve[obj]
    object_factory = object_factory[obj]

    if save_to == '':
        save_to = obj
        # Set CWD to root path
        os.chdir(root_path())
        # Create directories if not exist
        os.makedirs(f"{data_path}/{save_to}/json", exist_ok=True)
        # os.makedirs(f"{data_path}/{save_to}/pickle", exist_ok=True)
        # Use obj directory
        os.chdir(os.path.join(data_path, obj))

    for url in object_retrieve.get_all_urls():
        if "Knife" and "Gloves" and "Daggers" and "Karambit" and "Bayonet" not in url:
            # Retrieve title for filename and overwrite checks
            _ = object_retrieve._from_page_url(url)
            fname = filename(_.get_title())
            del _

            if (overwrite) or (not os.path.isfile(f'json/{fname}.json')):
                # Create object
                container = object_factory(url)
                # Dump
                with open(f'json/{fname}.json', 'w', encoding="utf-8", errors="ignore") as fp:
                        fmtdict = fmt_dict(container)
                        json.dump(fmtdict, fp, indent=2, ensure_ascii=False)


to_be_scraped = ["collections",
                 "cases"]

for obj in to_be_scraped:
    print(f"Scraping all {obj}...")
    save_data(obj=obj, overwrite=False)
    print(f"All {obj} has been scraped")
