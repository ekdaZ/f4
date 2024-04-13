import ics
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
        'week': event.begin.date().strftime('%U'),
        'day': event.begin.date().strftime('%Y-%m-%d'),
        'location': event.location,
        # 'Description': event.description,
        'begin': event.begin,
        'end': event.end,
        'priority': 'fix',
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
    df.to_csv('backend/table')
 

def get_week(week):
    df = pd.read_csv('backend/table')
    outputdf =  df.loc[df['week'] == week]
    json_data = outputdf.to_json(orient='records')
    return json_data
def get_day(day):
    df = pd.read_csv('backend/table')
    outputdf = df.loc[df['day'] == day]
    json_data = outputdf.to_json(orient='records')
    return json_data
def get_location(location):
    df = pd.read_csv('backend/table')
    return df.loc[df['location'] == location]

def post_cw(name, end, total_hours, per_session):
    sessions = total_hours % per_session
    if (total_hours % per_session) == 0:
        sessions = total_hours % per_session
    else:
        sessions = total_hours % per_session + 1
    return 0


print(read_calendar())

print(get_week(15))