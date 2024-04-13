import ics
import urllib.request
import pandas as pd
from datetime import datetime, timezone


# def calendar_import(calendar_link):
#     contents = ics.Calendar.from_ical(urllib.request.urlopen(calendar_link).read())

#     return 0

def event_to_dict(event):
    if datetime.now(timezone.utc) < event.begin:
        completion = False
    else:
        completion = True
    return {
        'name': event.name,
        'day': event.begin.date().strftime('%Y-%m-%d'),
        'location': event.location,
        # 'Description': event.description,
        'begin': event.begin,
        'end': event.end,
        # 'day': event.begin.date().strftime('%Y-%m-%d
        'priority': 'high',
        'completion': completion,
    }




def ics_to_csv():
    with open('backend/c_test.ics', 'r') as f:
        icsFile = ics.Calendar(f.read())
        events = [event_to_dict(event) for event in icsFile.events]
    return events
# calendar_link = 'https://mytimetable.bath.ac.uk/ical?eu=bHoyMDkxQGJhdGguYWMudWs=&h=KGJcLYfDMYrEkRccsDpsc5XKA1kwIcsb3nEI5Ebh_FM='


def read_calendar():
    df = pd.DataFrame(ics_to_csv())
    df.to_pickle('backend/table')
 

def get_week():
    datetime.now(timezone.utc)

def get_day(day):
    df = pd.read_pickle('backend/table')
    return df.loc[df['day'] == day]

print(read_calendar())

print(get_day('2024-04-15'))