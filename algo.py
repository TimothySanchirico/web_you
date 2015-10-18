#!/usr/bin/env python

#	Copyright 2013 AlchemyAPI
#
#   Licensed under the Apache License, Version 2.0 (the "License");
#   you may not use this file except in compliance with the License.
#   You may obtain a copy of the License at
#
#       http://www.apache.org/licenses/LICENSE-2.0
#
#   Unless required by applicable law or agreed to in writing, software
#   distributed under the License is distributed on an "AS IS" BASIS,
#   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#   See the License for the specific language governing permissions and
#   limitations under the License.


from __future__ import print_function
from alchemyapi import AlchemyAPI
import json
import urllib
import mechanize
from bs4 import BeautifulSoup
import re
import urlparse

classes = []

def classify(pronoun):
    if 'social' in pronoun or 'friends' in pronoun or 'network' in pronoun:
        classes.append('social')
    if 'education' in pronoun or 'learning' in pronoun:
        classes.append('educational')
    if 'business' in pronoun or 'financial' in pronoun or 'trading' in pronoun or 'stocks' in pronoun or 'investment' in pronoun:
        classes.append('business')
    if 'software' in pronoun or 'code' in pronoun or 'program' in pronoun:
        classes.append('programming')
    if 'sport' in pronoun or 'basektball' in pronoun or 'baseball' in pronoun or 'football' in pronoun or 'tennis' in pronoun or 'swim' in pronoun or 'run' in pronoun or 'soccer' in pronoun:
        classes.append('sports')
    if 'politic' in pronoun:
        classes.append('politics')
    if 'news' in pronoun or 'articles' in pronoun or 'post' in pronoun or 'insider' in pronoun:
        classes.append('news')
    if 'religion' in pronoun or 'religious' in pronoun or 'god' in pronoun or 'prayer' in pronoun:
        classes.append('religion')
    if 'food' in pronoun or 'eat' in pronoun or 'cook' in pronoun or 'restaurant' in pronoun:
        classes.append('food')
    if 'shop' in pronoun or 'buy' in pronoun or 'purchase' in pronoun:
        classes.append('shopping')
    if 'travel' in pronoun or 'vacation' in pronoun or 'airline' in pronoun:
        classes.append('travel')
    if 'video game' in pronoun or 'gaming' in pronoun or 'multiplayer' in pronoun or 'single player' in pronoun:
        classes.append('video games')
    if(len(classes) == 0):
        classes.append('other')
    return classes
#food, shopping, travel, video games, 

def relExtract(company, summary):
   

    alchemyapi = AlchemyAPI()

    

    response = alchemyapi.relations('text', summary)


    for relation in response['relations']:
        if 'subject' in relation:
            if company.lower().strip() in relation['subject']['text'].encode('utf-8').lower():
                
                return classify(relation['object']['text'].encode('utf-8').lower())
                break


def company_name(user_url):
    comps = user_url.split('.')
    company = comps[len(comps) - 2]
    return company

def wiki_url(company):
    br = mechanize.Browser()
    br.set_handle_robots(False)
    br.set_handle_equiv(False)
    br.addheaders = [('User-agent', 'Mozilla/5.0')] 
    br.open('http://www.google.com/') 
    # do the query
    br.select_form(name='f')   
    br.form['q'] = company +' wikipedia' # query
    data = br.submit()
    soup = BeautifulSoup(data.read(), "lxml")
    links = []
    for a in soup.select('.r a'):
        links.append(urlparse.parse_qs(urlparse.urlparse(a['href']).query)['q'][0])
    wiki_links = [link for link in links if "wikipedia" in link]
    return wiki_links[0]

def extract_text(link):
    soup = BeautifulSoup(urllib.urlopen(link).read())
    return soup.p.get_text()
