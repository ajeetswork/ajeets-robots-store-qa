const fs = require("fs");
const path = require("path");

function deepMerge(target, source) {
  if (!source) return target;
  const out = { ...target };
  for (const [key, value] of Object.entries(source)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      out[key] = deepMerge(out[key] || {}, value);
    } else {
      out[key] = value;
    }
  }
  return out;
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8"));
}

function parseEnvFile(relativePath) {
  const result = {};
  const text = fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq < 0) continue;
    result[line.slice(0, eq)] = line.slice(eq + 1);
  }
  return result;
}

function envToConfig(env) {
  const out = {};
  if (env.HTTP_PORT) out.http = { ...(out.http || {}), port: Number(env.HTTP_PORT) };
  if (env.LOG_LEVEL) out.logging = { ...(out.logging || {}), level: env.LOG_LEVEL };
  if (env.CACHE_TTL_SECONDS) out.cache = { ...(out.cache || {}), ttlSeconds: Number(env.CACHE_TTL_SECONDS) };
  if (env.INVENTORY_SYNC_INTERVAL_MINUTES) out.inventory = { ...(out.inventory || {}), syncIntervalMinutes: Number(env.INVENTORY_SYNC_INTERVAL_MINUTES) };
  if (env.TELEMETRY_SAMPLE_RATE) out.telemetry = { ...(out.telemetry || {}), sampleRate: Number(env.TELEMETRY_SAMPLE_RATE) };
  return out;
}

function loadConfig() {
  const environment = process.env.APP_ENV || "production";
  const base = readJson("config/base.json");
  const environmentConfig = readJson(`config/environments/${environment}.json`);
  const deployment = envToConfig(parseEnvFile(`deploy/${environment}.env`));
  const runtimeRecord = readJson("config/runtime-overrides.json");
  const runtime = runtimeRecord.values || {};

  return deepMerge(deepMerge(deepMerge(base, environmentConfig), deployment), runtime);
}

module.exports = { loadConfig };
