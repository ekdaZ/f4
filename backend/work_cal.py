import ics
import pandas as pd
from datetime import datetime, timezone, timedelta
import calendar

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
        'day': event.begin.date(),
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
    return df
 
def get_week(week):
    df = pd.read_csv('backend/table')
    outputdf =  df.loc[df['week'] == week]
    print(outputdf)
    json_data = outputdf.to_json(orient='records')
    return json_data

def get_day(day):
    df = pd.read_csv('backend/table')
    outputdf = df.loc[df['day'] == day]
    json_data = outputdf.to_json(orient='records')
    return json_data

# def get_location(location):
#     df = pd.read_csv('backend/table')
#     return df.loc[df['location'] == location]

def new_coursework(name, end, total_hours, per_day, per_week):
    pointer_day = datetime.now().date()
    total_days = end - pointer_day
    if (total_hours > total_days*per_week*per_day//7):
        print('ur fucked')
    else:
        print('fine')
        while(total_hours>0):
            week = get_week_python(pointer_day)
            asign_date = datetime.now().date()
            for day in week:
                for event in day:
                    if isNowInTimePeriod(week['begin'], week['end'],asign_date):
                        #assign it
                        pass
    pass
def isNowInTimePeriod(startTime, endTime, nowTime): 
    if startTime < endTime: 
        return nowTime >= startTime and nowTime <= endTime 
    else: 
        return nowTime >= startTime or nowTime <= endTime 

def get_week_python(day):
    df = pd.read_csv('backend/table')
    week = pd.DataFrame()
    for i in range(0,6):
        outputdf = df.loc[df['day'] == day.strftime('%Y-%m-%d')]
        week= pd.concat([week,outputdf])
        day += timedelta(days=1)
        # week = bubbleSort(week)
    tasks_count = week.groupby('day').size().reset_index(name='task_count')
    week = week.merge(tasks_count, on='day').sort_values(by='task_count')
    print(week[0]['begin'])
    return week


def bubbleSort(week):
    n = len(week)
    for i in range(n):
        swapped = False
        for j in range(0, n-i-1):
            if len(week[j]) > len(week[j+1]):
                week[j], week[j+1] = week[j+1], week[j]
                swapped = True
        if (swapped == False):
            break
    return week

# print(read_calendar())
# print(get_day('2024-04-15'))
get_week_python(datetime.now().date())
# print(new_coursework('cw1', , total_hours, per_day, per_week))