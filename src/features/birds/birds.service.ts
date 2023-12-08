import { Injectable } from '@nestjs/common';
import { Bird } from './bird';

@Injectable()
export class BirdsService {
  getBirds(): Bird[] { // Change return type to string[](stirng Array) 
    return [
      {
        "Id": 1,
        "BirdMyanmarName": "ငှက်စိမ်းရင်ဝါ",
        "BirdEnglishName": "Orange-bellied Leafbird",
        "Description": "မြန်မာလိုတော့ ငှက်စိမ်းရင်ဝါလို့ ခေါ်ကြတယ်။ အစိမ်းရောင် အမွှေးအတောင်တွေပိုင်ဆိုင်ထားတဲ့ ငှက်လေး တကောင်ပဲ ဖြစ်ပါတယ်။ ကျနော်တို့တွေ စိတ်ထဲ စွဲနေတာက အစိမ်းရောင် ငှက်ဆိုရင် အနီးစပ်ဆုံး ကြက်တူရွေးကို မြင်မိကြမှာပါ။  \nမြန်မာနိုင်ငံမှာဆိုရင်တော့ ကျနော်က သူ့ကို ကလော ဗျူးပွိုင့်သွားတဲ့လမ်းမှာ မှတ်တမ်းတင်ဖူးပါတယ်။​ အသံဆူဆူညံညံ အော်တတ်ပီး ချစ်စရာ အစိမ်းရောင် ငှက်လေး တမျိုး ဖြစ်ပါတယ်။",
        "ImagePath": "img/birds/img/1_Orange-belliedLeafbird.jpg"
      },
      {
        "Id": 2,
        "BirdMyanmarName": "ဆင်ပိန်ညှင်း",
        "BirdEnglishName": "Stork-billed Kingfisher",
        "Description": "ဒီ ဆင်ပိန်ညှင်း အမျိုးအစားက ပိန်ညှင်းတွေထဲမှာ တော်တော်ကြီးတဲ့အထဲပါတယ်။ သူက အဲ့ဒီ သစ်ကိုင်းပေါ်မနားခင် သူ့ အသိုက်ထဲမှာ နားလေ့ရှိတယ်။ ပီးတော့မှ ဒီ သစ်ကိုင်းပေါ်လာနားပီး အောက်က ချောင်းထဲမှာ ရှိတဲ့ ငါးလေးတွေကို ဒိုင်ဗင်ထိုးပီး ဖမ်းလေ့ရှိတယ်။​ သူ ငါးတွေ့လို့ ဒိုင်ဗင်ထိုးခါနီးဆို သူ့ခေါင်းကို ညိတ်သလို ခဏခဏ လုပ်လေ့ ရှိတယ်။ ",
        "ImagePath": "img/birds/img/2_StorkbilledKingfisher.png"
      },
      {
        "Id": 3,
        "BirdMyanmarName": "ချိုး ငှက်တမျိုး",
        "BirdEnglishName": "Black-napped Fruit Dove",
        "Description": "ကျနော်တို့ ရင်းနှီးနေတာ ချိုးလည်ပြောက်၊ ချိုးနီပု၊ ချိုးလင်းပြာ။ ကျနော်တို့ဆီမှာ အဲလို ချိုး ငှက် မျိုးတွေပဲ ရှိတာပေ့ါ။​\nအခု photoထဲက ချိုးငှက် ကျတော့ Black-napped Fruit Dove လို့ ခေါ်တဲ့ ချိုးတမျိုး။ အင်ဒိုနီးရှား ဘာလီကျွန်းမှာပဲ သူ့ကို မှတ်တမ်း တင်ခဲ့တာ။ သူက ခေါင်းမှာ အမဲကွက်လေး နဲ့ မျက်နှာက အဖြူရောင်။ ကိုယ်လုံးနဲ့တောင်ပံက အစိမ်းရောင်တွေရှိပီး အမြီးမှာကျတော့ အနီနဲ့ အ၀ါရောင်တွေနဲ့ တကယ်ကို လှပတဲ့ ချိုး ငှက်တမျိုးဗျ။ ကျနော် သူ့ကို တွေ့တွေ့ချင်း သူ့အလှကို ငေးကြည့်နေမိတော့တာပဲ။",
        "ImagePath": "img/birds/img/3_BlacknappedFruit Dove.png"
      },
      {
        "Id": 4,
        "BirdMyanmarName": "ဆက်ရက်",
        "BirdEnglishName": "Bali Myna",
        "Description": "ကျနော်တို့ မမြင်ဖူးတဲ့ ငှက်တွေဟာ ကျနော်တို့နိုင်ငံမဟုတ်တဲ့ အခြားဒေသတွေမှာ ရှိနေတတ်ပါတယ်။ ဒီငှက်လေးက Bali Myna လို့ခေါ်တဲ့ ဆက်ရက် အဖြူရောင်လေးပါ။ ကမ္ဘာပေါ်မှာ အင်ဒိုနီးရှားနိင်ငံက ဘာလီကျွန်းမှာပဲ တွေ့နိုင်တဲ့ ငှက်ဖြစ်ပါတယ်။",
        "ImagePath": "img/birds/img/4_BaliMyna.png"
      },
      {
        "Id": 5,
        "BirdMyanmarName": "မြေ၀ပ်ငှက်",
        "BirdEnglishName": "Savanna Nightjar",
        "Description": "မြေဝပ်ငှက်ဆိုတာ ကြားဖူးကြလား ? ကြားဖူးပီးထားပါတော့၊ မြင်ရော မြင်ဖူးကြရဲ့လား ? မုဆိုးဝတ္ထုတွေထဲမှာရေးထားတဲ့ ညဘက်တောလည်ရင်း ဓာတ်မီးနဲ့ထိုးလိုက်ရင် မြေကြီးနားကပ်နေတဲ့ မျက်လုံးတွေ မြင်ရတယ်ဆိုတာ ဒီ မြေဝပ်ငှက်တွေရဲ့ မျက်လုံးတွေပဲ ဖြစ်ပါတယ်။​\nနေ့ခင်းဘက်ကို အိပ်နေတတ်တာများပီး သူရဲ့ အမွှေးအတောင်တွေရဲ့ အရောင်ကြောင့် အလွယ်တကူမြင်တွေဖို့ ခက်ပါတယ်။ ကိုယ်က သူ့အနားရောက်သွားတဲ့အချိန် ရုတ်တရက်ထပျံသွားမှသာ သူ့ကို သတိထားမိတတ်ပါတယ်။ \nအခု photo ထဲမှာပါတဲ့ မြေ၀ပ်ငှက်ကိုတော့ Savanna Nightjar လို့ခေါ်ပါတယ်။ video ဆုံးခါနီးမှာ သူထပျံသွားတဲ့ ပုံလေးပါပါတယ်။\nမြန်မာနိုင်ငံမှာ သူနဲ့ မျိုးနွယ်တူ Great-eared Nightjar, Grey Nightjar, Large-tailed Nightjar နဲ့ Indian Nightjar ဆိုပီးတွေ့နိုင်ပါတယ်။ မြန်မာလိုဆိုရင်တော့ တောင်ဒေါင်း၊ မြေဝပ် သို့မဟုတ် ငှက်ပြင်းဆိုပီး ခေါ်ဝေါ်ကြပါသေးတယ်။ ",
        "ImagePath": "img/birds/img/5_SavannaNightjar.png"
      },
      {
        "Id": 6,
        "BirdMyanmarName": "ပိန်ညှင်း",
        "BirdEnglishName": "Kingfisher",
        "Description": " ပိန်ညှင်းလို့ ခေါ်တဲ့ Kingfisher ငှက်တွေကို သဘောကျ ကျတယ်နဲ့တူတယ်။ \nဒီငှက်လေးတွေက မြန်မာနိုင်ငံမှာ မတွေ့ရဘဲ အင်ဒိုနီးရှား နိုင်ငံ မှာပဲ တွေ့နိုင်တဲ့ ပိန်ညှင်း ငှက်လေးတွေပဲ ဖြစ်ပါတယ်။",
        "ImagePath": "img/birds/img/6_Kingfisher.png"
      },
      {
        "Id": 7,
        "BirdMyanmarName": "ကျောပြာပိုးကောင်ဖမ်းငှက်လည်ပြာ",
        "BirdEnglishName": "Blue-throated Flycatcher",
        "Description": "\nFlycatcher လို့ခါ်တဲ့ ပိုးကောင်ဖမ်းငှက်မျိုးနွယ်ဝင် ငှက်လေးဖြစ်ပါတယ်။ နာမည်နဲ့လိုက်အောင် ကျောကုန်းက အပြာရောင်သမ်းနေပီး ရင်ဘက်က လိမ္မော်ရောင် အကွက်လေးနဲ့ လှပတဲ့ ငှက်သေးသေးလေး တကောင်ပဲဖြစ်ပါတယ်။ \nဒီလိုမျိုး ငှက်ပုံလေးတွေရဲ့ နောက်ကွယ်မှာ ငှက်တွေကို ချစ်မြတ်နိုးတဲ့ ဓာတ်ဆရာတွေရဲ့ အားထုတ်ကြိုးစား မှတ်တမ်းတင်မှုတွေက မလွယ်ပါဘူး။",
        "ImagePath": "img/birds/img/7_BluethroatedFlycatcher.jpg"
      },
      {
        "Id": 8,
        "BirdMyanmarName": "ငှက်တော်မြီးကောက်",
        "BirdEnglishName": "Hair-crested Drongo",
        "Description": "\nကသစ်ပင်က အပွင့်တွေဆီ လာနားတဲ့ငှက်ထဲမှာ ငှက်တော်မြီးကောက်လည်း အပါအ၀င်ပေါ့ဗျာ။ သူ့ရဲ့ ခေါင်းမှာ အမွှေးလေး ၂ပင် ထောင်နေတာကို သတိထားမိကြလား? အဲ့ဒါက သူ့ကို အခြားငှက်တော်မျိုးစိတ်တွေထက် ခွဲခြားရလွယ်အောင် လုပ်ပေးထားသလိုမျိုး ဖြစ်နေတာပေါ့။  သူရဲ့ အမွှေးတောင် မည်းမည်းလေးတွေနဲ့ ကသစ်ပွင့် နီလွှလွှ တွေပေါ်မှာ နားနေတဲ့ပုံစံက အရာင်အစပ် လိုက်ဖက်ပီး ကြည့်ကောင်းနေတယ်လို့ ထင်ရပါတယ်။ ",
        "ImagePath": "img/birds/img/8_HaircrestedDrongo.jpg"
      },
      {
        "Id": 9,
        "BirdMyanmarName": "ငှက်ရွှေဝါခေါင်းမည်း",
        "BirdEnglishName": "Black-hooded Oriole",
        "Description": "\nဒီငှက်လေးတွေကို တချို့လည်း မြင်ဖူးကြမှာပါ။ ငှက်ရွှေဝါလို့ ခေါ်ကြပါတယ်။ ပဲခူးရိုးမမှာ ငှက်ပေါတယ် ကျနော်တင်ခဲ့တဲ့ ပို့်စ်တွေကို ကြည့်ပီး သတိထားမိနိုင်ပါတယ်။ အဲ့ဒီ ကသစ်ပင်မှာကို လာနားတဲ့ ငှက်တွေကို ထိုင်ပီး မှတ်တမ်းတင်တဲ့ ခဏမှာတင် ငှက်မျိုးစိတ် ၁၀မျိုးလောက်ထိ ရပါတယ်။ ကသစ်တွေပွင့်တဲ့အချိန် မနက်စောစော ထိုင်စောင့်နေရုံနဲ့တင် ငှက်တွေကို မြင်နိုင် မှတ်တမ်း တင်နိုင်အောင် ပေါနေပါသေးတယ်။\nကသစ်ပန်းတွေနဲ့ ပုံက ငှက်ရွှေဝါခေါင်းမည်းဖြစ်ပီး သစ်ရွက်စိမ်းတွေ ရှိတဲ့ကိုင်းမှာ နားနေတာက ငှက်ရွှေဝါပါ။ ရန်ကုန်မြို့ အချို့နေရာတွေမှာလည်း တွေ့နိုင်ပါတယ်။ ",
        "ImagePath": "img/birds/img/9_Black-hoodedOriole.jpg"
      },
      {
        "Id": 10,
        "BirdMyanmarName": "ဖိုးခေါင်ငှက်/ဘိုတိုး",
        "BirdEnglishName": "Lineated Barbet ",
        "Description": "\nနန္ဒာအိုင်မင်း သဏ္ဍာန်လိုကန်အတွင်းဘောင်\nရွှေအင်ကြင်းပန်းတွေမြန်းခတဲ့ချောင်\nညီနောင်ပင်ဒွယံမှာမြင်ရသယောင်\nအသွင်ခြားနားတာ သနားကမားနဲ့ဆောင်\nခင်ကညာသတိုးမြင်တာ ရွှေဖိုးခေါင်\nအသာအယာလှမ်းကြွကာဖမ်းပြရအောင်။\nအပေါ်က စာပိုဒ်လေးက ဆရာရွှေပြည်အေး ရေးပီး အန်တီ ဒေစီကျော်၀င်း ဆိုထားတဲ့ ရွှေဖိုးခေါင် သီချင်းထဲက ပထမဆုံး စာပိုဒ်လေးပါ။  \nဒီဖိုးခေါင်ငှက်လေးတွေကို ကျနော်တို့ ရိုးမသွားတဲ့ လမ်းဘေးက ကသစ်ပင်မှာ သူတို့ နားနေတဲ့အချိန် မှတ်တမ်းတင်ထားတာပါ။ နီမြမြ ကသစ်ပွင့်တွေမှာ အစိမ်းပါးပါးရောင် ဖိုးခေါင်ငှက်လေးတွေ နားနေတဲ့ပုံက သိပ်ကို ပနံ ရပါတယ်။",
        "ImagePath": "img/birds/img/10_LineatedBarbet.jpg"
      },
      {
        "Id": 11,
        "BirdMyanmarName": "ခေါင်းမီးခိုးရောင်ငူ",
        "BirdEnglishName": "Ashy-headed Green Pigeon",
        "Description": "\nရန်ကုန်-မန်းလေး အမြန်လမ်း မိုင်တိုင် ၈၃ ရဲ့ ဘယ်ဘက်မှာ ရိုးမပေါ်ကို ဖြတ်တတ်တဲ့ လမ်း တခုရှိတယ်။ ရဲနွယ်ဆည် ရှိတဲ့ဘက်ပေါ့။ အဲ့နေရာကနေ တက်သွားရင် လမ်းဘေး ဘယ်ညာ ငှက်သိပ်ပေါတယ်။ \nရိုးမကို တက်တဲ့လမ်းအတိုင်း တက်သွားရင် လမ်းဘေးက သစ်ခြောက်ပင် ကိုင်းမှာ ငူငှက်တွေ အပြည့် နားနေတာ မသိရင် တပင်လုံး ငှက်တွေ သီးနေသလိုထင်ရအောင် ငှက် ပေါ်တယ်။ နာမည်ကြီး အောင်လောင်ငှက်တွေ အစာလာစားတဲ့အပင်၊ အောက်ချင်းငှက်တွေ ပျံသွားတာ၊ သာလိကာတွေ အုပ်လိုက်အစာစားတာ၊ သစ်တောက်ငှက်တွေ တတောက်တောက်နဲ့ အပင်ကို ခေါက်နေတာ စသည်ဖြင့် တော်တော်ကို စုံပါတယ်။ \nမနက်စောစော အဲ့ဒီလမ်းပေါ်မှာ ကားမောင်းရတဲ့ အရသာကလည်း သဘောကျစရာပဲ။ လမ်းရဲ့ ညာဘက်ခြမ်း ရဲနွယ်ဆည်ရဲ့ ရေပြင်ကို တောင်ကုန်းပေါ်ကနေ လှမ်းမြင်ရတဲ့အခိုက်အတန့်ကလည်း သိပ်ကိုလှပတယ်။ \nဒီ ခေါင်းမီးရောင်ငူကို ကျနော်တို့ အဲ့မှာ မှတ်တမ်းတင်ခဲ့တယ်။ နောက်ထပ် ကျနော်တို့ မှတ်တမ်းတင်ချင်တဲ့ ငှက်တွေ အဲ့နေရာမှာ အများကြီး ကျန်နေသေးတယ်။ လုံခြုံစိတ်ချရတဲ့အချိန်ကျရင် ညအိပ်ခရီးသွားပီး အဲ့နေရာမှာ ငှက်တွေကို သွားကြည့်မယ်။ ",
        "ImagePath": "img/birds/img/11_Ashy-headedGreenPigeon.jpg"
      },
      {
        "Id": 12,
        "BirdMyanmarName": "ဂိုဏ်းစတား",
        "BirdEnglishName": "Chestnut-capped laughingthrush",
        "Description": "\nFraser's hill\nတကယ်တော့ သူက တစ်မျိုးလေး လှတယ်\nခက်တာ က \n\" မြင်ပါများတော့ ရိုး \" ဆိုသလို Fraser's hill တောင်ပေါ် မှာ သူတို့ က အင်မတန် တွေ့ရလွယ်တော့ ကျနော်တို့ က သူ့ အပေါ် တန်ဖိုး ထားမှု နည်းသွားခဲ့ရတယ်။\nငှက်ဓာတ်ဆရာ တွေ က သူတို့ ကို နာမည်ပြောင် ပေးထားကြတယ်။\n\" ဂိုဏ်းစတား \" လို့ \nဘယ်နေရာ မှာ ဘာငှက်ခေါ်ခေါ် သူတို့ က အမြဲ ရောက်လာပြီး ချ ထားတဲ့ အစာ တွေ အကုန်အုပ်ကြလို့ပါပဲ။",
        "ImagePath": "img/birds/img/12_Chestnut-cappedlaughingthrush.jpg"
      },
      {
        "Id": 13,
        "BirdMyanmarName": "၀တ်ရည်စုပ်လည်ပြာ",
        "BirdEnglishName": "Olive-backed Sunbird",
        "Description": "\nတိုင်းရင်းသားကျေးရွာမှာ မှတ်တမ်းတင်ထားတဲ့ ၀တ်ရည်စုပ်လည်ပြာ ငှက်လေး။ နှုတ်သီးကောက်ကောက် လေးနဲ့ ပန်း၀တ်ရည် စုပ်တတ်တဲ့ ငှက်သေးသေးလေး တမျိုးပါပဲ။\nကျနော်သဘောကျတဲ့ ငှက်အမျိုးအစားထဲမှာ ဒီငှက်လေးတွေလည်း ပါ၀င်ပါတယ်။ အကောင်သေးသေးနဲ့ သူ့ရဲ့အရောင်လေးတွေက သိပ်ချစ်ဖို့ ကောင်းပါတယ်။",
        "ImagePath": "img/birds/img/13_Olive-backedSunbird.jpg"
      },
      {
        "Id": 14,
        "BirdMyanmarName": "စာမဲ",
        "BirdEnglishName": "Black-naped Monarch",
        "Description": "\nကျနော်ကတော့ သူ့ကို စာမဲလို့ ခေါ်တာထက် စာပြာလေးလို့ ခေါ်ရင် ပိုသင့်တော်မယ်လို့ ထင်မိတယ်။ တကိုယ်လုံး နီးပါး အပြာရောင် အမွှေးအတောင်လေးနဲ့ ငှက်လေးကို ဘာကြောင့်များ စာပြာလို့ မခေါ်ခဲ့ကြပါလိမ့်။\nနောက်တခုက အပြာရောင်ဆိုတာ ချစ်ခြင်းမေတ္တာ နဲ့ ပတ်သက်တဲ့ အရောင်လို့ သတ်မှတ်ကြတယ်။ လှပတဲ့ ငှက်အပြာရောင်လေးဆိုတော ပိုပီး လှနေတယ်လို့ ထင်မိပါတယ်။ ငှက်အပြာရောင်လေးကို ကြည့်ပီး အပြန်အလှန် ချစ်ခြင်းမေတ္တာတွေ တိုးပွားကြပါစေ။",
        "ImagePath": "img/birds/img/14_Black-napedMonarch.jpg"
      },
      {
        "Id": 15,
        "BirdMyanmarName": "တောသားသပိတ်လွယ်ငှက်",
        "BirdEnglishName": "White-rumped Shama ",
        "Description": "\nတေးသီငှက် မွေးတဲ့သူတွေကြားမှာ အလွန်ရေပန်းစားတဲ့ငှက်ပေါ့။  အသံသာသလို အရောင်အဆင်းလည်း လှတယ်။ \nသူ့ကို အမြင်မှာ ကြည့်ချင်ရင်တော့ ရန်ကုန်ကဆို လှော်ကားဥယျာဥ်မှာ သွားကြည့်ရင် အလွယ်တကူတွေ့နိုင်တယ်။ ",
        "ImagePath": "img/birds/img/15_White-rumpedShama.jpg"
      },
      {
        "Id": 16,
        "BirdMyanmarName": "ဆက်ရက်တောင်ပံဖြူ",
        "BirdEnglishName": "Chestnut-tailed Starling ",
        "Description": "\nဆက်ရက်တောင်ပံဖြူတဲ့။ ရန်ကုန် တိုင်းရင်းသားကျေးရွာထဲက ကောင်လေးတွေပေါ့။ ပြောရရင် တိုင်းရင်းသားကျေးရွာကလည်း ငှက်တော်တော်များများရှိသား။ ရောက်ရင် သတိထားပီး ကြည့်ကြဗျာ။\nကျနော်တို့ မမြင်ဖူးသေးတဲ့ ငှက်လေးတွေတောင် တွေ့ရင် တွေ့ရမှာ။​",
        "ImagePath": "img/birds/img/16_Chestnut-tailedStarling.jpg"
      },
      {
        "Id": 17,
        "BirdMyanmarName": "နဖားကြူး",
        "BirdEnglishName": "Hooded Treepie",
        "Description": "ပုဂံ/ပုပ္ပါးက နဖားကြူး(Hooded Treepie)\nဒီကောင်က ဆရာကြီး။ မြန်မာနိုင်ငံမှာပဲ တွေ့ရတဲ့ ငှက်ဗျ။ တွေ့ရရင်လည်း နီးနီးကပ်ကပ် ဓာတ်ပုံမှတ်တမ်း ရဖို့ ခက်တယ်။ \nအပြင်မှာ အဲ့ကောင် တကယ့်ကို လှတယ်။ ပုဂံက ဘုရားတွေ လိုက်ဖူးရင်းနဲ့ ကံကောင်းရင် သူ့ကိုတွေ့နိုင်တယ်။​ ဘုရားလည်းဖူးရင်း လိပ်ဥလည်း တူးရင်းတော့ မဟုတ်ဘူး။ ဘုရားလည်းဖူးရင်း ငှက်လည်းကြည့်ပေါ့ဗျာ။ အဲ့တာမျိုးက ခင်ဗျားတို့ စိတ်အပန်းပြေစေတယ်။ ",
        "ImagePath": "img/birds/img/17_HoodedTreepie.jpg"
      },
      {
        "Id": 18,
        "BirdMyanmarName": "မြန်မာယူဟီးနား",
        "BirdEnglishName": "Burmese Yuhina",
        "Description": "ကလောက Burmese Yuhina (မြန်မာယူဟီးနား)\n\nကလောလို့ ပြောလိုက်ရင် နာရီစင်၊ ရေအေးကန်၊ အိုးစည်တောင်၊ ဗျူးပွိုင့်ဆိုတဲ့ နေရာတွေနဲ့ တွဲပီး လူသိများတယ်။\n\nဒါပေမယ် ကလောက ငှက်ကြည့်ဖို့အတွက် အရမ်းကောင်းတဲ့နေရာဆိုတာတော့ သိတဲ့သူတွေနည်းတာပေါ့ဗျာ။ ရေအေးကန် သွားတဲ့လမ်းတလျှောက်၊ ဗျူးပွိုင့်သွားတဲ့လမ်း၊​ အိုးစည်တောင်သွားတဲ့လမ်းကနေ ဆက်သွားရတဲ့ မြင်းက စတဲ့နေရာတွေက ငှက်ကြည့်သမားတွေ ငှက်ဓာတ်ဆရာတွေ သဘောအရမ်းကျတဲ့နေရာတွေပေါ့။\n\nအခု တင်ထားတဲ့ မြန်မာ့ယူဟီးနား ဆိုတဲ့ငှက်ကို ဗျူးပွိုင့်သွားတဲ့လမ်းက ရေထွက်တခုနားမှာ ကံကောင်းစွာနဲ့ မှတ်တမ်းတင်ခွင့်ရတယ်။ ကလောက သိပ်သဘောကောင်းတဲ့ ဝါရင့်ငှက်ကြည့်လမ်းညွှန် ကိုဖိုးခွားရဲ့ ကျွမ်းကျင်မှု နဲ့ အတွေ့အကြုံတွေကြောင့် အချိန် ၁ နာရီလောက်အတွင်းမှာ ယူဟီးနားလေးတွေကို မှတ်တမ်းတင်ခွင့်ရတယ်။\n\nပျော်တာပေါ့ဗျာ။ ကိုယ်လိုချင်တဲ့ ငှက်ကို အချိန်တိုအတွင်း ရအောင် မှတ်တမ်းတင်နိုင်တာ နည်းတဲ့ ကံကောင်းချက်မှ မဟုတ်တာ။ ယူဟီးနားအပြင် အခြားငှက်လေးတွေလည်း မှတ်တမ်းရခဲ့သေးတာပေါ့။ ကလောရဲ့ ရာသီဥတု အေးစိမ့်စိမ်နဲ့ ငှက်ကြည့်ရတဲ့ အချိန်တွေကလည်း တကယ့်ကို တန်ဖိုးရှိပ။ ကလောရောက်ခဲ့လို့ ဗျူးပွိုင့်သွားဖြစ်ရင် သတိထားပီး ကြည့်ကြည့်ဗျာ။ ငှက်လှလှလေးတွေ တွေ့ဖို့ အခွင့်အရေးများတယ်ဗျ။",
        "ImagePath": "img/birds/img/18_BurmeseYuhina.jpg"
      },
      {
        "Id": 19,
        "BirdMyanmarName": "စာ၀တီး",
        "BirdEnglishName": "Scaly-breasted Munia",
        "Description": "\n\nစာ၀တီးလို့ ခေါ်တဲ့ ငှက်လေးလေ။\n\nသူ့ကို အပြင်မှာ မမြင်ဖူးရင်တောင် ဘုရားသွားတဲ့အခါ ဘုရားရဲ့ စောင်းတန်းအ၀တွေမှာ ငှက်လွှတ်ဦးမလားလို့ မေးတဲ့၊ လွှတ်ပီးရင် ပြန်ပြန်ဖမ်းရောင်းတဲ့ ငှက်ဖမ်းသမားတွေရဲ့ ခြင်းထဲမှာ တွေ့ဖူးကြမှာပါ။\n\nအရွယ်အစား သေးငယ်တဲ့ စာတမျိုးဖြစ်ပီး ရင်ဘက်မှာ အကွက် အကွက်လေးတွေနဲ့ လှပတဲ့ ငှက်လေး တမျိုးဖြစ်ပါတယ်။ အုပ်စုလိုက်နေထိုင်ကျက်စားကြတာကို တွေ့ဖူးပါတယ်။ အဲ့လိုမျိုး နေထိုင်ကျက်စားတဲ့အတွက် ငှက်ဖမ်းသမားတွေရဲ့ထောင်ချောက်ထဲ အလွယ်တကူ သက်ဆင်းရတာနေမှာပါ။",
        "ImagePath": "img/birds/img/19_Scaly-breastedMunia.jpg"
      },
      {
        "Id": 20,
        "BirdMyanmarName": "ပသျှူးစာ",
        "BirdEnglishName": "Eurasian Tree Sparrow",
        "Description": "\n\nဒါကတော့ နောက်ထပ် စာ တမျိုးဖြစ်တဲ့ ပသျှူးစာ အမျိုးအစားပေါ့ဗျာ။ အမှတ်တမဲ့ ကြည့်ရင်တော့ ကျနော်တို့ နေ့တိုင်း မြင်နေကြဖြစ်တဲ့ House Sparrow စာကလေးနဲ့ တော်တော်တူပါတယ်။",
        "ImagePath": "img/birds/img/20_EurasianTreeSparrow.jpg"
      }
    ];
  }
}


