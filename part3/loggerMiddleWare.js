const logger = (request, response, next) => {
  console.log(request.method)
  console.log(request.path)
  console.log('-----')
  next()
}

module.exports = logger //  ES_module declaration
//  module.exports = logger //  CommonJS_module declaration
