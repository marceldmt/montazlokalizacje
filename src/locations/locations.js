import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dxrzqbaihyuqsyvwilwp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4cnpxYmFhaHl1cXN5dndpbHdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgwMjk0MTcsImV4cCI6MjA0MzYwNTQxN30.60R1sGHG73oS1n25bRuJweJ3odiQQEouIgwovJwCmGw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getLocations = async () => {
  try {
    const { data, error } = await supabase
      .from('Lokalizacje')
      .select('*');

    if (error) {
      console.error('Error fetching locations:', error);
      throw error; // Re-throw the error to be caught in App.jsx
    }

    return data;
  } catch (error) {
    console.error('Error in getLocations:', error);
    return []; // Return an empty array if there's an error
  }
};

export default getLocations;