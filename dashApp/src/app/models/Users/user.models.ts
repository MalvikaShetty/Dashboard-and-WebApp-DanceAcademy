export class User {
    username:string='';
    password:string=''; // Note: Usually not advisable to handle plain passwords directly on the client-side for security reasons.
    role:string='';
    isActive: boolean = true; 
    token?:string=''; // Optional since it may not always be present
  }