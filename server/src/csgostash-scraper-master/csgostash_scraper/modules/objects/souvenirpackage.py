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

from .container import Container
from .collection import Collection


class SouvenirPackage(Container):
    """Represents a Souvenir Package.

    CSGOStash Page: https://csgostash.com/containers/souvenir-packages
    """
    __slots__ = ('name', 'icon', 'collection',
                 'content', 'has_multiple_collections')

    def __init__(self, name: str, collection: list):
        super().__init__(name)

        if len(collection) == 1:
            self.collection = collection[0]
            self.has_multiple_collections = False
        else:
            self.collection = collection
            self.has_multiple_collections = True

        self.content = self.collection

    @classmethod
    def __base__(cls):
        """Get base class."""

        return cls

    def __repr__(self):
        return "<Container.SouvenirPackage name='%s' custom='%s'>" % (self.name, self._spawned)

    def __str__(self):
        return self.name

    def __eq__(self, other):
        return (
            isinstance(other, self.__base__()) and
            all([getattr(other, key) == getattr(self, key)
                 for key in self.__slots__])
        )

    def __ne__(self, other):
        return not self.__eq__(other)

    def __hash__(self):
        return hash((self._spawned, self.name))

    def __iter__(self):
        if not self.has_multiple_collections:
            # This allows for the container itself to be iterable
            return self.collection.__iter__()

    def __next__(self):
        if not self.has_multiple_collections:
            return self.collection.__next__()

    @classmethod
    def _from_data(cls, d):
        """Object constructor from dictionary
        This method is called by the scraper and should not be called manually
        """
        name = d['name']
        collection = d['collection']

        _cls = cls(name, collection)
        _cls._spawned = False
        return _cls
