import { createClient } from '@supabase/supabase-client';

const supabaseUrl = 'https://qydofrtctgyfbicexyby.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5ZG9mcnRjdGd5ZmJpY2V4eWJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyNzQ0MDUsImV4cCI6MjA4Mjg1MDQwNX0.gEZLKDmWF-KfaO6KvwCVMy_Xoo28zznqPhjgnJ6_qCg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);