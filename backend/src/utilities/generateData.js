function generateData(type, text, user) {
   const data = {
      type,
      user,
      text,
      timestamp: new Date()
   }
   return data;
}

module.exports = generateData;