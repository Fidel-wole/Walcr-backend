/* eslint-disable prettier/prettier */
export class CardData {
  userId: string;
  card: {
    item: {
      card_holder_name: string;
      card_number: number;
      exp_month: number;
      exp_year: number;
      brand: string;
    };
  };
  paymentMethodId: string;
}
