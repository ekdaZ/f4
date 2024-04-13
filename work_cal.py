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
        'begin': event.begin.date().strftime('%Y-%m-%d'),
        'location': event.location,
        # 'Description': event.description,
        'begin': event.begin,
        'end': event.end,
        'priority': 'high',
        'completion': completion,
    }




def ics_to_csv():
    with open('c_test.ics', 'r') as f:
        icsFile = ics.Calendar(f.read())
        events = [event_to_dict(event) for event in icsFile.events]
    return events
# calendar_link = 'https://mytimetable.bath.ac.uk/ical?eu=bHoyMDkxQGJhdGguYWMudWs=&h=KGJcLYfDMYrEkRccsDpsc5XKA1kwIcsb3nEI5Ebh_FM='


def read_calendar():
    df = pd.DataFrame(ics_to_csv())
    print(df)

def get_week():
    datetime.now(timezone.utc)

# def get_day():

# df_calendar['begin'] = pd.to_datetime(df_calendar['begin']).dt.normalize()

# # Filter out old events (if necessary)
# #df_calendar = df_calendar.loc[df_calendar['begin'] >= '2022-01-01']

# # Filter out future events
# df_calendar = df_calendar.loc[df_calendar['begin'] <= pd.Timestamp.today()]

# # Filter in only actual 'busy' events, not 'tentative', and duration > 0 and duration <= 8h
# df_calendar = df_calendar.loc[(df_calendar['name'] == 'Busy') & (df_calendar['duration_hours'] > 0) & (df_calendar['duration_hours'] <= 8)]


print(read_calendar())