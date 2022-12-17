const alias = {
  _id: "id",
  식품명: "name",
  "1회제공량": "servingSize",
  "에너지(㎉)": "kiloCalories",
  "수분(g)": "water",
  "단백질(g)": "protein",
  "지방(g)": "fat",
  "나트륨(㎎)": "sodium",
  "탄수화물(g)": "carbohydrate",
  "총당류(g)": "sugars",
  "총 포화 지방산(g)": "saturatedFattyAcid",
  "카페인(㎎)": "caffeine",
};

const keyChange = function (source) {
  for (const key in source) {
    if (key in alias) {
      if (alias[key] == "id" || alias[key] == "name") {
        source[alias[key]] = source[key];
      } else {
        const number = parseFloat(source[key]);
        source[alias[key]] = isNaN(number) ? null : number;
      }
      delete source[key];
    }
  }
  return source;
};

module.exports = keyChange;
