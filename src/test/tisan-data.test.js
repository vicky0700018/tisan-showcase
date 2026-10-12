import { describe, expect, it } from 'vitest';
import { createInitialData, business, validateEnquiry } from '../data/tisan';

describe('TISAN demo requirements', () => {
  it('retains the exact supplied business identity', () => {
    expect(business.name).toBe('TISAN GREEN ENERGY PRIVATE LIMITED');
    expect(business.phone).toBe('245132452254');
    expect(business.email).toBe('tisangreen@gmail.com');
    expect(business.address).toBe('Address details to be updated');
    expect(business.credit).toBe('Designed and development by SOSynch Ai Tech');
  });
  it('contains three distinct banners, six concepts, and twelve gallery records', () => {
    const d = createInitialData();
    expect(d.banners).toHaveLength(3);
    expect(d.projects).toHaveLength(6);
    expect(d.gallery).toHaveLength(12);
    expect(new Set(d.images.map((i) => i.url)).size).toBe(d.images.length);
    expect(d.projects.every((p) => p.label === 'Concept Showcase' && p.galleryIds.length >= 2)).toBe(true);
  });
  it('requires consent and valid phone and email before accepting an enquiry', () => {
    const valid = {name:'Demo Visitor', phone:'9876543210', email:'demo@example.com', type:'General Enquiry', category:'Residential', message:'A demo requirement', consent:true};
    expect(validateEnquiry(valid)).toEqual({});
    expect(validateEnquiry({...valid, consent:false})).toHaveProperty('consent');
    expect(validateEnquiry({...valid, phone:'abc'})).toHaveProperty('phone');
    expect(validateEnquiry({...valid, email:'invalid'})).toHaveProperty('email');
  });
  it('starts each new demo session without old enquiries', () => {
    const first = createInitialData();
    first.enquiries.push({id:'example'});
    expect(createInitialData().enquiries).toHaveLength(0);
  });
});