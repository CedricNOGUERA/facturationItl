import { supabase } from '../supabaseClient'


export const _getQuoteById = async (quoteId: any, setData: any) => {
  let { data: quotes, error } = await supabase
    .from('quotes')
    .select('*, detailQuote(*)')
    .eq('id', quoteId)
    .single()

  if (quotes) {
    setData(quotes)
  }
  if (error) {
    console.log(error)
  }
}
