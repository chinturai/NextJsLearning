import 'server-only';
 
import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token } from '../env'
import { error } from 'console';

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token
})

if(! writeClient.config().token){
    throw new Error("Token not found for Write Client");
}
