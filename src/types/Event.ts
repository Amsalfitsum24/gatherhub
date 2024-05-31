export interface Event {
  id: string;
  title: string;
  description: string;
  date: {
    seconds: number;
    nanoseconds: number;
  };
  city: string;
  address: string;
  category: string;
  payment: number;
  imageUrl: string[];
  requirements: string;
  attendees: Array<{ name: string; email: string; phone: string }>;
  userId: string;
  username: string; // Add the username field here
}
