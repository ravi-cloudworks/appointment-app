// Helper function to create calendar event
export async function createCalendarEvent({ summary, description, startTime, endTime, attendeeEmail }) {
    try {
      const event = {
        summary,
        description,
        start: {
          dateTime: startTime,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        end: {
          dateTime: endTime,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        attendees: [
          { email: attendeeEmail }
        ],
        reminders: {
          useDefault: true
        },
        conferenceData: {
          createRequest: {
            requestId: Date.now().toString(),
            conferenceSolutionKey: { type: 'hangoutsMeet' }
          }
        }
      };
  
      const response = await gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
        conferenceDataVersion: 1
      });
  
      return response.result;
    } catch (error) {
      console.error('Error creating calendar event:', error);
      throw error;
    }
  }
  
  // Helper function to check availability
  export async function checkAvailability(date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
  
    try {
      const response = await gapi.client.calendar.freebusy.query({
        resource: {
          timeMin: startOfDay.toISOString(),
          timeMax: endOfDay.toISOString(),
          items: [{ id: 'primary' }]
        }
      });
  
      return response.result.calendars.primary.busy;
    } catch (error) {
      console.error('Error checking availability:', error);
      throw error;
    }
  }