import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dxrzqbaihyuqsyvwilwp.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4cnpxYmFpaHl1cXN5dndpbHdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgwMjk0MTcsImV4cCI6MjA0MzYwNTQxN30.60R1sGHG73oS1n25bRuJweJ3odiQQEouIgwovJwCmGw';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase environment variables not set.');
  throw new Error('Supabase environment variables not set.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getLocations = async () => {
  try {
    const { data, error } = await supabase
      .from('Lokalizacje')
      .select('*');

    if (error) {
      console.error('Error fetching locations:', error);
      throw new Error(`Supabase error: ${error.message} - ${error.details}`); // More detailed error message
    }

    if (!data || !Array.isArray(data)) {
      console.error('Invalid data received from Supabase:', data);
      throw new Error('Supabase returned invalid data.');
    }

    // More robust ID handling - using Supabase's ID if available, otherwise generating one
    return data.map((location) => ({ ...location, id: location.id || location.ID || crypto.randomUUID() }));
  } catch (error) {
    console.error('Error in getLocations:', error);
    return [];
  }
};

export default getLocations;