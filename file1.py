
import icalendar
import urllib.request



def calendar_import(calendar_link):
    contents = icalendar.Calendar.from_ical(urllib.request.urlopen(calendar_link).read())
    print(contents)
    return 0

calendar_import('https://mytimetable.bath.ac.uk/ical?eu=bHoyMDkxQGJhdGguYWMudWs=&h=KGJcLYfDMYrEkRccsDpsc5XKA1kwIcsb3nEI5Ebh_FM=')
