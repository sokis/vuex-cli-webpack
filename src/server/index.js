import webpack from 'webpack'
import url from 'url'
import wpOpt from '../build'
import open from 'opn'
import WebpackDevServer from 'webpack-dev-server'

const DEFAULT_PORT = 8080
let argv = []


function colorInfo(useColor, msg) {
  if (useColor)
  // Make text blue and bold, so it *pops*
    return "\u001b[1m\u001b[34m" + msg + "\u001b[39m\u001b[22m";
  return msg;
}

function colorError(useColor, msg) {
  if (useColor)
  // Make text red and bold, so it *pops*
    return "\u001b[1m\u001b[31m" + msg + "\u001b[39m\u001b[22m";
  return msg;
}

function startDevServer(wpOpt, options) {
  const protocol = options.https ? "https" : "http"

  // the formatted domain (url without path) of the webpack server
  const domain = url.format({
    protocol: protocol,
    hostname: options.host,
    port: options.socket ? 0 : options.port.toString()
  })

  if (options.inline !== false) {
    let devClient = [require.resolve("webpack-dev-server/client/") + "?" + (options.public ? protocol + "://" + options.public : domain)]
    if (options.hotOnly) devClient.push("webpack/hot/only-dev-server")
    else if (options.hot) devClient.push("webpack/hot/dev-server");

    [].concat(wpOpt).forEach(function(wpOpt) {
      if (typeof wpOpt.entry === "object" && !Array.isArray(wpOpt.entry)) {
        Object.keys(wpOpt.entry).forEach(function(key) {
          wpOpt.entry[key] = devClient.concat(wpOpt.entry[key])
        })
      } else {
        wpOpt.entry = devClient.concat(wpOpt.entry)
      }
    })
  }

  let compiler
  try {
    compiler = webpack(wpOpt)
  } catch (e) {
    throw e
  }

  compiler.apply(new webpack.ProgressPlugin())

  const uri = domain + (options.inline !== false || options.lazy === true ? "/" : "/webpack-dev-server/")
  let server
  try {
    server = new WebpackDevServer(compiler, options)
  } catch (e) {
    throw e
  }

  server.listen(options.port, options.host, function(err) {
    if (err) throw err
    reportReadiness(uri, options)
  })
}

function reportReadiness(uri, options) {
  var useColor = true
  var startSentence = "Project is running at " + colorInfo(useColor, uri)
  console.log("\n" + startSentence)
  console.log("webpack output is served from " + colorInfo(useColor, options.publicPath))
  if (options.open)
    open(uri)
}

export default function processOptions() {
  const options = wpOpt.devServer || {}

  if (!options.publicPath) {
    options.publicPath = wpOpt.output && wpOpt.output.publicPath || ""
    if (!/^(https?:)?\/\//.test(options.publicPath) && options.publicPath[0] !== "/")
      options.publicPath = "/" + options.publicPath
  }

  if (!options.filename)
    options.filename = wpOpt.output && wpOpt.output.filename

  if (!options.watchOptions)
    options.watchOptions = wpOpt.watchOptions

  if (!options.stats) {
    options.stats = {
      cached: false,
      cachedAssets: false
    }
  }

  if (typeof options.stats === "object" && typeof options.stats.colors === "undefined")
    options.stats.colors = true

  options.port = (options.port || DEFAULT_PORT)
  if (options.port) {
    startDevServer(wpOpt, options)
    return
  }
}