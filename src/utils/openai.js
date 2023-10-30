import OpenAI from 'openai';
import { OPEN_API_KEY } from './constants';

const openai =(key)=> new OpenAI({
  apiKey: key, // defaults to process.env["OPENAI_API_KEY"]
  dangerouslyAllowBrowser:true//to use on front-end, bad practice, openai should be used on backend
});

export default openai;