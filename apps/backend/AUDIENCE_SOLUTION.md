```typescript
// firebasedeki audience yapısı
export interface Audience {
  id?: string; 
  key: string; // e.g., "country", "age", "phoneModel", etc.
  condition: string; // e.g., "==", "!=", ">", "<", ">=", "<="
  value: string; // e.g., "TR", "US", "18", "false", "IPhone 13", etc.
  name?: string; // e.g., "Turkey Users", "Adult Users", "iPhone Users", "Over 25 age Users"
} 
```

```typescript
// client tarafındaki kullanıcı örneği
export interface user {
  id?: string; 
  email?: string;
  age?: number;
  country?: string;
  phoneModel?: string;
}
```

```typescript
// backend tarafındaki çözüm şöyle olmalıydı
import { Parameter } from '../models/Parameter';
import { audienceService } from '../service/audienceService';
import { Audience } from '../models/Audience';
import { User } from '../models/User';

// Get all parameters in JSON format
export const getAllParametersClient = async (country: string, user: User) => {

  const audiences = await audienceService.getAudiences();
  const applyingAudiences: Audience[] = [];

  let isInAudience = true;

  for (const audience of audiences) {
    const userValue = user[audience.key];
    if (!(userValue && evaluateCondition(userValue, audience.condition, audience.value))) {
      isInAudience = false;
    } else {
      applyingAudiences.push(audience);
    }
  }

  // parametrelerin hepsini al
  const parameters = await parameterService.getAllParameters();

  // sonuç olarak json objesi döneceğiz
  const filteredParameters: { [key: string]: any } = {};
  
  // parametreleri dolaş ve uygun değeri ata
  parameters.forEach(param => {

    // aimAudience bizim kullanıcının en yüksek öncelikli audience'ına eşit olacak, eğer bulamazsak default kalsın
    let aimAudience = "default";

    // rankinglere göre en yüksek öncelikli audience'ı bul
    const rankings = parameters.rankings;
    rankings.forEach(ranking => {
        // eğer bulduysak for loopunu boz ve aimAudience'ı ata (rankingdeki ilk id en önemli id ve sonraki idler daha az önemli, applyingAudiences'ların id'sinde var mı diye bakıyoruz)
        if (ranking in applyingAudiences.map(a => a.id)) {
          aimAudience = ranking;
          // en önemli audience bulununca döngüyü kır
          break;
        }
      });

    // o aimAudience ile olan değeri bulacağız
    if (param.parameterKey) {
      if (isInAudience && param.value[aimAudience] !== undefined) {
        filteredParameters[param.parameterKey] = param.value[aimAudience];
      }
      else {
        filteredParameters[param.parameterKey] = param.value['default'] || param.value;  
      }
    }
  }); 

  return filteredParameters;
};
```

```typescript
// yardımcı fonksiyon: koşulu buluyor ve değerlendiriyor
const evaluateCondition = (userValue: any, condition: string, audienceValue: any): boolean => {
  switch (condition) {
    case '==':
      return userValue == audienceValue;
    case '!=':
      return userValue != audienceValue;
    case '>':
      return userValue > audienceValue;
    case '<':
      return userValue < audienceValue;
    case '>=':
      return userValue >= audienceValue;
    case '<=':
      return userValue <= audienceValue;
    default:
      return false;
  }
};
```
```typescript
// yukarıdaki kod, kullanıcı bilgilerine ve audience tanımlarına göre parametreleri filtreleyip dönen bir servis fonksiyonu yazmış olduk, user bilgisi controllerdan geldi
// controllera da hayali mobil uygulamanın kendisinden geldi
// audience tanımları ise veritabanından alındı
// frontend tarafında ise sürüklenince parameter.ranking dizisi güncelleniyor ve backend tarafında bu diziye göre en önemli audience belirleniyor
// böylece kullanıcı hangi audience'a uyuyorsa ona göre parametre değerleri döndürülüyor
// aynı şekilde frontend tarafı da rankinglerin idlerine sahip sadece ve onlar da audienceService'i kullanıyorlar (audienceService.getAudiences())
// böylece audience tanımlarını ve idlerini bilmiyorlar sadece audience.name'lerini kullanıyorlar onlar görünmüş oluyor
// frontend tarafında minik bir buton var ona bastığımız zaman da yeni audience oluşturulabiliyor ve select kısmından o seçilebiliyor
```

```typescript
// Flow şu şekilde olacak
// - Panelden product manager yeni bir audience oluşturacak
// edit butonuna bastığında çıkan popupta Select dropdownındaki seçenekler bütün audienceları fetch edip gösterecek
// - oradan birisini seçtiği zaman yukarıdaki data yapısı gibi backendde value onun sadece id'sini tutuyor olacak mesela value: { default: 5,  123214(id'si): 7 }
// - panelde onun açıklamasını da name ile çekeceği için id çirkin görünmeyecek sadece o auidence'ın name'i yazacak
// - Client service (mobil uygulama) çağrıldığında request.body'de user bilgisi de olacak
// - userın audienceları mevcut sistemdeki audiencelar ile karşılaştırılıp applyingAudience listesi oluşacak
// - Her bir parametre için o parametrenin ranking listedekilerden rankingi en yüksek olanı for loopu ile seçeceğiz
// - eğer var ise ranking aimAudience olacak yoksa default değeri alacağız ve döneceğiz
```