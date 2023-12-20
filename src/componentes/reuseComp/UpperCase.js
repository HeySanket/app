export function UpperCase(val = "heading required") {
  console.log(val);
  var str = val.split(" ");
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i][0].toUpperCase() + str[i].substr(1);
  }
  return str.join(" ");
}
