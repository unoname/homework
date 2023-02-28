class ParsingStr {
  lowerCase(str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  }

  correctSpace(str) {
    return str
      .replace(/( {2,})/, ' ')
      .replace(/[:|,|;](?!\s)/g, match => match + ' ')
      .replace(/\s(?=[:|,|;|?|!|.])/g, match => '');
  }

  countAllWords(str) {
    return str.replace(/(\p)/g, '').split(' ').length;
  }

  countUniqWords(str) {
    let newStr = str.toLowerCase();
    let words = this.correctSpace(newStr)
      .replace(/([:|,|;|?|!|.])/g, '')
      .split(' ');
    const wordsCount = words.reduce(function (acc, word) {
      let s = word.toLowerCase();
      if (s in acc) {
        acc[s] += 1;
      } else {
        acc[s] = 1;
      }
      return acc;
    }, {});

    for (let word in wordsCount)
      console.log(
        'Количество повторений слова "%s" равно %d',
        word,
        wordsCount[word]
      );
  }
}
const str =
  'текст,в котором Слово    ,текст несколько раз встречается и слово тоже';
const parseStr = new ParsingStr();
parseStr.countUniqWords(str);

export default ParsingStr;