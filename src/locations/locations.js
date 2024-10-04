import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dxrzqbaihyuqsyvwilwp.supabase.co';
const supabaseServiceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4cnpxYmFhaHl1cXN5dndpbHdwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyODAyOTQxNywiZXhwIjoyMDQzNjA1NDE3fQ.PtdhjKi_fq9Rq87k_IrBInCbZIGouZUjldmMlL7CuQo';

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export const getLocations = async () => {
  try {
    const { data, error } = await supabase
      .from('Lokalizacje')
      .select('*');

    if (error) {
      console.error('Error fetching locations:', error);
      throw new Error(`Supabase error: ${error.message}`);
    }

    if (!data || !Array.isArray(data)) {
      throw new Error('Supabase returned invalid data.');
    }

    return data.map((location) => ({ ...location, id: location.ID })); // Map to add id field
  } catch (error) {
    console.error('Error in getLocations:', error);
    return [];
  }
};

export default getLocations;