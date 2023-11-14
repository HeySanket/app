export function UpperCase(val = "heading required") {
    var str = val.split(" ");
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }
    return str.join(" ");
  }