import { ApiProperty } from '@nestjs/swagger';

export class NatMyatSiQuestion {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'ဒီနှစ်အတွင်း အိမ်ထောင်ကျမှာလား။' })
  text: string;
}

export class NatMyatSiSymbol {
  @ApiProperty({ example: 'pisces' })
  id: string;

  @ApiProperty({ example: 'Pisces' })
  name: string;

  @ApiProperty({ example: '♓' })
  symbol: string;

  @ApiProperty({ example: 1, minimum: 0, maximum: 3 })
  row: number;

  @ApiProperty({ example: 3, minimum: 0, maximum: 3 })
  column: number;
}

export class NatMyatSiReadingAnswer {
  @ApiProperty({
    example: 'အဝေးတစ်နေရာ (သို့) ခရီးသွားရင်း ဖူးစာဆုံ၍ အိမ်ထောင်ကျမည်။',
  })
  text: string;
}

export class NatMyatSiReading {
  @ApiProperty({ type: () => NatMyatSiQuestion })
  question: NatMyatSiQuestion;

  @ApiProperty({ type: () => NatMyatSiSymbol })
  symbol: NatMyatSiSymbol;

  @ApiProperty({ type: () => NatMyatSiReadingAnswer })
  answer: NatMyatSiReadingAnswer;
}

export interface NatMyatSiDataAnswer {
  question_id: number;
  symbol_id: string;
  text: string;
}

export interface NatMyatSiData {
  questions: NatMyatSiQuestion[];
  symbols: NatMyatSiSymbol[];
  answers: NatMyatSiDataAnswer[];
}
