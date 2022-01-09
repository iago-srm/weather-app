import { Client } from "@googlemaps/google-maps-services-js";
import { Request, Response } from 'express';

const googleKey = 'AIzaSyDUcRufXFYP0bx9L1acubRv729tA0ooCpc';

export const autoComplete = (req: Request, res: Response) => {
  res.set('Access-Control-Allow-Origin', '*');
  const client = new Client({});
  client.placeAutocomplete({params: {input: req.query.input as string, language: req.query.language as string, key: googleKey}}).then(result => {
    res.status(200).json(result.data.predictions);
  }).catch(err => {
    res.send('houve um erro'+err.response);
  });
};

export const placeDetails = (req: Request, res: Response) => {
  res.set('Access-Control-Allow-Origin', '*');
  const client = new Client({});
  client.placeDetails({params: {place_id: req.query.place_id as string, key: googleKey, fields: ['geometry'] }}).then(result => {
    res.status(200).json(result.data.result.geometry?.location);
  }).catch((err: any) => {
    res.send('houve um erro'+err.response);
  });
};