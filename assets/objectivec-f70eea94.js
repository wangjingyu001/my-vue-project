import { X as process, Y as getDefaultExportFromCjs, Z as commonjsGlobal, $ as buffer, __tla as __tla_0 } from "./index-43347b94.js";
import { e as empty_1, p as pathBrowserify } from "./index-63909147.js";
let toJsonString;
let __tla = Promise.all([
    (()=>{
        try {
            return __tla_0;
        } catch  {}
    })()
]).then(async ()=>{
    class CCError extends Error {
    }
    const UTF8encoder = new TextEncoder;
    function has(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }
    function isInt(t) {
        return /^\s*[+-]?\d+$/.test(t);
    }
    class Word {
        constructor(e){
            this.valueOf = Word.toString, typeof e == "string" && (e = [
                e
            ]), (e === void 0 || e.length === 0) && (e = [
                ""
            ]), this.tokens = [];
            for (const r of e)typeof r == "string" ? this.tokens.length > 0 && typeof this.tokens[this.tokens.length - 1] == "string" ? this.tokens[this.tokens.length - 1] += r : r && this.tokens.push(r) : this.tokens.push(r);
            this.tokens.length === 0 && this.tokens.push("");
        }
        get length() {
            let e = 0;
            for (const r of this.tokens)typeof r == "string" ? e += r.length : e += 1;
            return e;
        }
        *[Symbol.iterator]() {
            for (const e of this.tokens)if (typeof e == "string") for (const r of e)yield r;
            else yield e;
        }
        get(e) {
            let r = 0;
            for (const s of this.tokens)if (typeof s == "string") {
                if (r + s.length > e) return s[e - r];
                r += s.length;
            } else {
                if (r === e) return s;
                r += 1;
            }
            throw new CCError("Index out of bounds");
        }
        charAt(e = 0) {
            try {
                return this.get(e);
            } catch  {}
            return "";
        }
        indexOf(e, r) {
            r === void 0 && (r = 0);
            let s = 0;
            for (const n of this.tokens)if (typeof n == "string") {
                if (s + n.length > r) {
                    const o = n.indexOf(e, r - s);
                    if (o !== -1) return s + o;
                }
                s += n.length;
            } else s += 1;
            return -1;
        }
        indexOfFirstChar(e) {
            let r = 0;
            for (const s of this.tokens)if (typeof s == "string") for (const n of s){
                if (e.includes(n)) return r;
                r += 1;
            }
            else r += 1;
            return -1;
        }
        removeFirstChar(e) {
            return this.length === 0 ? new Word : this.charAt(0) === e ? this.slice(1) : this.copy();
        }
        copy() {
            return new Word(this.tokens);
        }
        slice(e, r) {
            if (e === void 0 && (e = this.length), r === void 0 && (r = this.length), e >= this.length) return new Word;
            if (e < 0 && (e = Math.max(e + this.length, 0)), r < 0 && (r = Math.max(r + this.length, 0)), r <= e) return new Word;
            const s = [];
            let n = 0;
            for (const o of this.tokens)typeof o == "string" ? (n + o.length > e && n < r && s.push(o.slice(Math.max(e - n, 0), r - n)), n += o.length) : (n >= e && n < r && s.push(o), n += 1);
            return new Word(s);
        }
        includes(e, r) {
            r === void 0 && (r = 0);
            let s = 0;
            for (const n of this.tokens)if (typeof n == "string") {
                if (s + n.length > r && n.includes(e, r - s)) return !0;
                s += n.length;
            } else s += 1;
            return !1;
        }
        test(e) {
            for (const r of this.tokens)if (typeof r == "string" && e.test(r)) return !0;
            return !1;
        }
        prepend(e) {
            const r = this.copy();
            return r.tokens.length && typeof r.tokens[0] == "string" ? r.tokens[0] = e + r.tokens[0] : r.tokens.unshift(e), r;
        }
        append(e) {
            const r = this.copy();
            return r.tokens.length && typeof r.tokens[r.tokens.length - 1] == "string" ? r.tokens[r.tokens.length - 1] += e : r.tokens.push(e), r;
        }
        add(e) {
            return new Word([
                ...this.tokens,
                ...e.tokens
            ]);
        }
        match(e) {
            for (const r of this.tokens)if (typeof r == "string") {
                const s = r.match(e);
                if (s) return s;
            }
            return null;
        }
        search(e) {
            let r = 0;
            for (const s of this.tokens)if (typeof s == "string") {
                const n = s.search(e);
                if (n !== -1) return r + n;
                r += s.length;
            }
            return -1;
        }
        replace(e, r) {
            const s = [];
            for (const n of this.tokens)typeof n == "string" ? s.push(n.replace(e, r)) : s.push(n);
            return new Word(s);
        }
        split(e, r) {
            const s = [];
            let n = 0, o = 0;
            for(; n < this.length;){
                let a = !0;
                for(let l = 0; l < e.length; l++)if (this.get(n + l) !== e.charAt(l)) {
                    a = !1;
                    break;
                }
                if (a) {
                    if (s.push(this.slice(o, n)), n += e.length, o = n, r !== void 0 && s.length === r - 1) break;
                } else n += 1;
            }
            return o <= this.length && s.push(this.slice(o)), s;
        }
        toLowerCase() {
            return new Word(this.tokens.map((e)=>typeof e == "string" ? e.toLowerCase() : e));
        }
        toUpperCase() {
            return new Word(this.tokens.map((e)=>typeof e == "string" ? e.toUpperCase() : e));
        }
        trimStart() {
            const e = [];
            let r, s;
            for ([r, s] of this.tokens.entries())typeof s == "string" ? (r === 0 && (s = s.trimStart()), s && e.push(s)) : e.push(s);
            return e.length === 0 ? new Word : new Word(e);
        }
        trimEnd() {
            const e = [];
            let r, s;
            for ([r, s] of this.tokens.entries())typeof s == "string" ? (r === this.tokens.length - 1 && (s = s.trimEnd()), s && e.push(s)) : e.push(s);
            return e.length === 0 ? new Word : new Word(e);
        }
        trim() {
            const e = [];
            let r, s;
            for ([r, s] of this.tokens.entries())typeof s == "string" ? (r === 0 && (s = s.trimStart()), r === this.tokens.length - 1 && (s = s.trimEnd()), s && e.push(s)) : e.push(s);
            return e.length === 0 ? new Word : new Word(e);
        }
        isEmpty() {
            return this.tokens.length === 0 ? !0 : this.tokens.length === 1 && typeof this.tokens[0] == "string" ? this.tokens[0].length === 0 : !1;
        }
        toBool() {
            return !this.isEmpty();
        }
        isString() {
            for (const e of this.tokens)if (typeof e != "string") return !1;
            return !0;
        }
        firstShellToken() {
            for (const e of this.tokens)if (typeof e != "string") return e;
            return null;
        }
        startsWith(e) {
            return this.tokens.length === 0 ? !1 : typeof this.tokens[0] == "string" ? this.tokens[0].startsWith(e) : !1;
        }
        endsWith(e) {
            if (this.tokens.length === 0) return !1;
            const r = this.tokens[this.tokens.length - 1];
            return typeof r == "string" ? r.endsWith(e) : !1;
        }
        toString() {
            return this.tokens.map((e)=>typeof e == "string" ? e : e.text).join("");
        }
    }
    function eq(t, e) {
        return t == null || e === void 0 || e === null ? t === e : typeof e == "string" ? t.tokens.length === 1 && typeof t.tokens[0] == "string" && t.tokens[0] === e : t.tokens.length === e.tokens.length && t.tokens.every((r, s)=>{
            const n = e.tokens[s];
            return typeof r == "string" ? r === n : typeof n != "string" ? r.text === n.text : !1;
        });
    }
    function firstShellToken(t) {
        return typeof t == "string" ? null : t.firstShellToken();
    }
    function mergeWords(...t) {
        const e = [];
        for (const r of t)r instanceof Word ? e.push(...r.tokens) : e.push(r);
        return new Word(e);
    }
    function joinWords(t, e) {
        const r = [];
        for (const s of t)r.length && r.push(e), r.push(...s.tokens);
        return new Word(r);
    }
    var treeSitter = {
        exports: {}
    };
    (function(module, exports) {
        var Module = typeof Module < "u" ? Module : {}, ENVIRONMENT_IS_WEB = typeof window == "object", ENVIRONMENT_IS_WORKER = typeof importScripts == "function", ENVIRONMENT_IS_NODE = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string", TreeSitter = function() {
            var initPromise, document = typeof window == "object" ? {
                currentScript: window.document.currentScript
            } : null;
            class Parser {
                constructor(){
                    this.initialize();
                }
                initialize() {
                    throw new Error("cannot construct a Parser before calling `init()`");
                }
                static init(moduleOptions) {
                    return initPromise || (Module = Object.assign({}, Module, moduleOptions), initPromise = new Promise((resolveInitPromise)=>{
                        var moduleOverrides = Object.assign({}, Module), arguments_ = [], thisProgram = "./this.program", quit_ = (t, e)=>{
                            throw e;
                        }, scriptDirectory = "";
                        function locateFile(t) {
                            return Module.locateFile ? Module.locateFile(t, scriptDirectory) : scriptDirectory + t;
                        }
                        var readAsync, readBinary;
                        if (ENVIRONMENT_IS_NODE) {
                            var fs = empty_1, nodePath = pathBrowserify;
                            scriptDirectory = __dirname + "/", readBinary = (t)=>{
                                t = isFileURI(t) ? new URL(t) : nodePath.normalize(t);
                                var e = fs.readFileSync(t);
                                return e;
                            }, readAsync = (t, e = !0)=>(t = isFileURI(t) ? new URL(t) : nodePath.normalize(t), new Promise((r, s)=>{
                                    fs.readFile(t, e ? void 0 : "utf8", (n, o)=>{
                                        n ? s(n) : r(e ? o.buffer : o);
                                    });
                                })), !Module.thisProgram && process.argv.length > 1 && (thisProgram = process.argv[1].replace(/\\/g, "/")), arguments_ = process.argv.slice(2), module.exports = Module, quit_ = (t, e)=>{
                                throw process.exitCode = t, e;
                            };
                        } else (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && (ENVIRONMENT_IS_WORKER ? scriptDirectory = self.location.href : typeof document < "u" && document.currentScript && (scriptDirectory = document.currentScript.src), scriptDirectory.startsWith("blob:") ? scriptDirectory = "" : scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1), ENVIRONMENT_IS_WORKER && (readBinary = (t)=>{
                            var e = new XMLHttpRequest;
                            return e.open("GET", t, !1), e.responseType = "arraybuffer", e.send(null), new Uint8Array(e.response);
                        }), readAsync = (t)=>isFileURI(t) ? new Promise((e, r)=>{
                                var s = new XMLHttpRequest;
                                s.open("GET", t, !0), s.responseType = "arraybuffer", s.onload = ()=>{
                                    (s.status == 200 || s.status == 0 && s.response) && r(s.response), e(s.status);
                                }, s.onerror = e, s.send(null);
                            }) : fetch(t, {
                                credentials: "same-origin"
                            }).then((e)=>e.ok ? e.arrayBuffer() : Promise.reject(new Error(e.status + " : " + e.url))));
                        var out = Module.print || console.log.bind(console), err = Module.printErr || console.error.bind(console);
                        Object.assign(Module, moduleOverrides), moduleOverrides = null, Module.arguments && (arguments_ = Module.arguments), Module.thisProgram && (thisProgram = Module.thisProgram), Module.quit && (quit_ = Module.quit);
                        var dynamicLibraries = Module.dynamicLibraries || [], wasmBinary;
                        Module.wasmBinary && (wasmBinary = Module.wasmBinary);
                        var wasmMemory, ABORT = !1, EXITSTATUS, HEAP8, HEAPU8, HEAP_DATA_VIEW;
                        function updateMemoryViews() {
                            var t = wasmMemory.buffer;
                            Module.HEAP_DATA_VIEW = HEAP_DATA_VIEW = new DataView(t), Module.HEAP8 = HEAP8 = new Int8Array(t), Module.HEAP16 = new Int16Array(t), Module.HEAPU8 = HEAPU8 = new Uint8Array(t), Module.HEAPU16 = new Uint16Array(t), Module.HEAP32 = new Int32Array(t), Module.HEAPU32 = new Uint32Array(t), Module.HEAPF32 = new Float32Array(t), Module.HEAPF64 = new Float64Array(t);
                        }
                        if (Module.wasmMemory) wasmMemory = Module.wasmMemory;
                        else {
                            var INITIAL_MEMORY = Module.INITIAL_MEMORY || 33554432;
                            wasmMemory = new WebAssembly.Memory({
                                initial: INITIAL_MEMORY / 65536,
                                maximum: 2147483648 / 65536
                            });
                        }
                        updateMemoryViews();
                        var __ATPRERUN__ = [], __ATINIT__ = [], __ATMAIN__ = [], __ATPOSTRUN__ = [], __RELOC_FUNCS__ = [], runtimeInitialized = !1;
                        function preRun() {
                            if (Module.preRun) for(typeof Module.preRun == "function" && (Module.preRun = [
                                Module.preRun
                            ]); Module.preRun.length;)addOnPreRun(Module.preRun.shift());
                            callRuntimeCallbacks(__ATPRERUN__);
                        }
                        function initRuntime() {
                            runtimeInitialized = !0, callRuntimeCallbacks(__RELOC_FUNCS__), callRuntimeCallbacks(__ATINIT__);
                        }
                        function preMain() {
                            callRuntimeCallbacks(__ATMAIN__);
                        }
                        function postRun() {
                            if (Module.postRun) for(typeof Module.postRun == "function" && (Module.postRun = [
                                Module.postRun
                            ]); Module.postRun.length;)addOnPostRun(Module.postRun.shift());
                            callRuntimeCallbacks(__ATPOSTRUN__);
                        }
                        function addOnPreRun(t) {
                            __ATPRERUN__.unshift(t);
                        }
                        function addOnInit(t) {
                            __ATINIT__.unshift(t);
                        }
                        function addOnPostRun(t) {
                            __ATPOSTRUN__.unshift(t);
                        }
                        var runDependencies = 0, dependenciesFulfilled = null;
                        function getUniqueRunDependency(t) {
                            return t;
                        }
                        function addRunDependency(t) {
                            runDependencies++, Module.monitorRunDependencies?.(runDependencies);
                        }
                        function removeRunDependency(t) {
                            if (runDependencies--, Module.monitorRunDependencies?.(runDependencies), runDependencies == 0 && dependenciesFulfilled) {
                                var e = dependenciesFulfilled;
                                dependenciesFulfilled = null, e();
                            }
                        }
                        function abort(t) {
                            Module.onAbort?.(t), t = "Aborted(" + t + ")", err(t), ABORT = !0, EXITSTATUS = 1, t += ". Build with -sASSERTIONS for more info.";
                            var e = new WebAssembly.RuntimeError(t);
                            throw e;
                        }
                        var dataURIPrefix = "data:application/octet-stream;base64,", isDataURI = (t)=>t.startsWith(dataURIPrefix), isFileURI = (t)=>t.startsWith("file://");
                        function findWasmBinary() {
                            var t = "tree-sitter.wasm";
                            return isDataURI(t) ? t : locateFile(t);
                        }
                        var wasmBinaryFile;
                        function getBinarySync(t) {
                            if (t == wasmBinaryFile && wasmBinary) return new Uint8Array(wasmBinary);
                            if (readBinary) return readBinary(t);
                            throw "both async and sync fetching of the wasm failed";
                        }
                        function getBinaryPromise(t) {
                            return wasmBinary ? Promise.resolve().then(()=>getBinarySync(t)) : readAsync(t).then((e)=>new Uint8Array(e), ()=>getBinarySync(t));
                        }
                        function instantiateArrayBuffer(t, e, r) {
                            return getBinaryPromise(t).then((s)=>WebAssembly.instantiate(s, e)).then(r, (s)=>{
                                err(`failed to asynchronously prepare wasm: ${s}`), abort(s);
                            });
                        }
                        function instantiateAsync(t, e, r, s) {
                            return !t && typeof WebAssembly.instantiateStreaming == "function" && !isDataURI(e) && !isFileURI(e) && !ENVIRONMENT_IS_NODE && typeof fetch == "function" ? fetch(e, {
                                credentials: "same-origin"
                            }).then((n)=>{
                                var o = WebAssembly.instantiateStreaming(n, r);
                                return o.then(s, function(a) {
                                    return err(`wasm streaming compile failed: ${a}`), err("falling back to ArrayBuffer instantiation"), instantiateArrayBuffer(e, r, s);
                                });
                            }) : instantiateArrayBuffer(e, r, s);
                        }
                        function getWasmImports() {
                            return {
                                env: wasmImports,
                                wasi_snapshot_preview1: wasmImports,
                                "GOT.mem": new Proxy(wasmImports, GOTHandler),
                                "GOT.func": new Proxy(wasmImports, GOTHandler)
                            };
                        }
                        function createWasm() {
                            var t = getWasmImports();
                            function e(s, n) {
                                wasmExports = s.exports, wasmExports = relocateExports(wasmExports, 1024);
                                var o = getDylinkMetadata(n);
                                return o.neededDynlibs && (dynamicLibraries = o.neededDynlibs.concat(dynamicLibraries)), mergeLibSymbols(wasmExports), LDSO.init(), loadDylibs(), addOnInit(wasmExports.__wasm_call_ctors), __RELOC_FUNCS__.push(wasmExports.__wasm_apply_data_relocs), removeRunDependency(), wasmExports;
                            }
                            addRunDependency();
                            function r(s) {
                                e(s.instance, s.module);
                            }
                            if (Module.instantiateWasm) try {
                                return Module.instantiateWasm(t, e);
                            } catch (s) {
                                return err(`Module.instantiateWasm callback failed with error: ${s}`), !1;
                            }
                            return wasmBinaryFile || (wasmBinaryFile = findWasmBinary()), instantiateAsync(wasmBinary, wasmBinaryFile, t, r), {};
                        }
                        function ExitStatus(t) {
                            this.name = "ExitStatus", this.message = `Program terminated with exit(${t})`, this.status = t;
                        }
                        var GOT = {}, currentModuleWeakSymbols = new Set([]), GOTHandler = {
                            get (t, e) {
                                var r = GOT[e];
                                return r || (r = GOT[e] = new WebAssembly.Global({
                                    value: "i32",
                                    mutable: !0
                                })), currentModuleWeakSymbols.has(e) || (r.required = !0), r;
                            }
                        }, LE_HEAP_LOAD_F32 = (t)=>HEAP_DATA_VIEW.getFloat32(t, !0), LE_HEAP_LOAD_F64 = (t)=>HEAP_DATA_VIEW.getFloat64(t, !0), LE_HEAP_LOAD_I16 = (t)=>HEAP_DATA_VIEW.getInt16(t, !0), LE_HEAP_LOAD_I32 = (t)=>HEAP_DATA_VIEW.getInt32(t, !0), LE_HEAP_LOAD_U32 = (t)=>HEAP_DATA_VIEW.getUint32(t, !0), LE_HEAP_STORE_F32 = (t, e)=>HEAP_DATA_VIEW.setFloat32(t, e, !0), LE_HEAP_STORE_F64 = (t, e)=>HEAP_DATA_VIEW.setFloat64(t, e, !0), LE_HEAP_STORE_I16 = (t, e)=>HEAP_DATA_VIEW.setInt16(t, e, !0), LE_HEAP_STORE_I32 = (t, e)=>HEAP_DATA_VIEW.setInt32(t, e, !0), LE_HEAP_STORE_U32 = (t, e)=>HEAP_DATA_VIEW.setUint32(t, e, !0), callRuntimeCallbacks = (t)=>{
                            for(; t.length > 0;)t.shift()(Module);
                        }, UTF8Decoder = typeof TextDecoder < "u" ? new TextDecoder : void 0, UTF8ArrayToString = (t, e, r)=>{
                            for(var s = e + r, n = e; t[n] && !(n >= s);)++n;
                            if (n - e > 16 && t.buffer && UTF8Decoder) return UTF8Decoder.decode(t.subarray(e, n));
                            for(var o = ""; e < n;){
                                var a = t[e++];
                                if (!(a & 128)) {
                                    o += String.fromCharCode(a);
                                    continue;
                                }
                                var l = t[e++] & 63;
                                if ((a & 224) == 192) {
                                    o += String.fromCharCode((a & 31) << 6 | l);
                                    continue;
                                }
                                var u = t[e++] & 63;
                                if ((a & 240) == 224 ? a = (a & 15) << 12 | l << 6 | u : a = (a & 7) << 18 | l << 12 | u << 6 | t[e++] & 63, a < 65536) o += String.fromCharCode(a);
                                else {
                                    var p = a - 65536;
                                    o += String.fromCharCode(55296 | p >> 10, 56320 | p & 1023);
                                }
                            }
                            return o;
                        }, getDylinkMetadata = (t)=>{
                            var e = 0, r = 0;
                            function s() {
                                return t[e++];
                            }
                            function n() {
                                for(var O = 0, B = 1;;){
                                    var S = t[e++];
                                    if (O += (S & 127) * B, B *= 128, !(S & 128)) break;
                                }
                                return O;
                            }
                            function o() {
                                var O = n();
                                return e += O, UTF8ArrayToString(t, e - O, O);
                            }
                            function a(O, B) {
                                if (O) throw new Error(B);
                            }
                            var l = "dylink.0";
                            if (t instanceof WebAssembly.Module) {
                                var u = WebAssembly.Module.customSections(t, l);
                                u.length === 0 && (l = "dylink", u = WebAssembly.Module.customSections(t, l)), a(u.length === 0, "need dylink section"), t = new Uint8Array(u[0]), r = t.length;
                            } else {
                                var p = new Uint32Array(new Uint8Array(t.subarray(0, 24)).buffer), d = p[0] == 1836278016 || p[0] == 6386541;
                                a(!d, "need to see wasm magic number"), a(t[8] !== 0, "need the dylink section to be first"), e = 9;
                                var c = n();
                                r = e + c, l = o();
                            }
                            var m = {
                                neededDynlibs: [],
                                tlsExports: new Set,
                                weakImports: new Set
                            };
                            if (l == "dylink") {
                                m.memorySize = n(), m.memoryAlign = n(), m.tableSize = n(), m.tableAlign = n();
                                for(var h = n(), w = 0; w < h; ++w){
                                    var y = o();
                                    m.neededDynlibs.push(y);
                                }
                            } else {
                                a(l !== "dylink.0");
                                for(var T = 1, E = 2, f = 3, _ = 4, x = 256, A = 3, g = 1; e < r;){
                                    var b = s(), v = n();
                                    if (b === T) m.memorySize = n(), m.memoryAlign = n(), m.tableSize = n(), m.tableAlign = n();
                                    else if (b === E) for(var h = n(), w = 0; w < h; ++w)y = o(), m.neededDynlibs.push(y);
                                    else if (b === f) for(var F = n(); F--;){
                                        var I = o(), U = n();
                                        U & x && m.tlsExports.add(I);
                                    }
                                    else if (b === _) for(var F = n(); F--;){
                                        o();
                                        var I = o(), U = n();
                                        (U & A) == g && m.weakImports.add(I);
                                    }
                                    else e += v;
                                }
                            }
                            return m;
                        };
                        function getValue(t, e = "i8") {
                            switch(e.endsWith("*") && (e = "*"), e){
                                case "i1":
                                    return HEAP8[t];
                                case "i8":
                                    return HEAP8[t];
                                case "i16":
                                    return LE_HEAP_LOAD_I16((t >> 1) * 2);
                                case "i32":
                                    return LE_HEAP_LOAD_I32((t >> 2) * 4);
                                case "i64":
                                    abort("to do getValue(i64) use WASM_BIGINT");
                                case "float":
                                    return LE_HEAP_LOAD_F32((t >> 2) * 4);
                                case "double":
                                    return LE_HEAP_LOAD_F64((t >> 3) * 8);
                                case "*":
                                    return LE_HEAP_LOAD_U32((t >> 2) * 4);
                                default:
                                    abort(`invalid type for getValue: ${e}`);
                            }
                        }
                        var newDSO = (t, e, r)=>{
                            var s = {
                                refcount: 1 / 0,
                                name: t,
                                exports: r,
                                global: !0
                            };
                            return LDSO.loadedLibsByName[t] = s, e != null && (LDSO.loadedLibsByHandle[e] = s), s;
                        }, LDSO = {
                            loadedLibsByName: {},
                            loadedLibsByHandle: {},
                            init () {
                                newDSO("__main__", 0, wasmImports);
                            }
                        }, ___heap_base = 78112, zeroMemory = (t, e)=>(HEAPU8.fill(0, t, t + e), t), alignMemory = (t, e)=>Math.ceil(t / e) * e, getMemory = (t)=>{
                            if (runtimeInitialized) return zeroMemory(_malloc(t), t);
                            var e = ___heap_base, r = e + alignMemory(t, 16);
                            return ___heap_base = r, GOT.__heap_base.value = r, e;
                        }, isInternalSym = (t)=>[
                                "__cpp_exception",
                                "__c_longjmp",
                                "__wasm_apply_data_relocs",
                                "__dso_handle",
                                "__tls_size",
                                "__tls_align",
                                "__set_stack_limits",
                                "_emscripten_tls_init",
                                "__wasm_init_tls",
                                "__wasm_call_ctors",
                                "__start_em_asm",
                                "__stop_em_asm",
                                "__start_em_js",
                                "__stop_em_js"
                            ].includes(t) || t.startsWith("__em_js__"), uleb128Encode = (t, e)=>{
                            t < 128 ? e.push(t) : e.push(t % 128 | 128, t >> 7);
                        }, sigToWasmTypes = (t)=>{
                            for(var e = {
                                i: "i32",
                                j: "i64",
                                f: "f32",
                                d: "f64",
                                e: "externref",
                                p: "i32"
                            }, r = {
                                parameters: [],
                                results: t[0] == "v" ? [] : [
                                    e[t[0]]
                                ]
                            }, s = 1; s < t.length; ++s)r.parameters.push(e[t[s]]);
                            return r;
                        }, generateFuncType = (t, e)=>{
                            var r = t.slice(0, 1), s = t.slice(1), n = {
                                i: 127,
                                p: 127,
                                j: 126,
                                f: 125,
                                d: 124,
                                e: 111
                            };
                            e.push(96), uleb128Encode(s.length, e);
                            for(var o = 0; o < s.length; ++o)e.push(n[s[o]]);
                            r == "v" ? e.push(0) : e.push(1, n[r]);
                        }, convertJsFunctionToWasm = (t, e)=>{
                            if (typeof WebAssembly.Function == "function") return new WebAssembly.Function(sigToWasmTypes(e), t);
                            var r = [
                                1
                            ];
                            generateFuncType(e, r);
                            var s = [
                                0,
                                97,
                                115,
                                109,
                                1,
                                0,
                                0,
                                0,
                                1
                            ];
                            uleb128Encode(r.length, s), s.push(...r), s.push(2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0);
                            var n = new WebAssembly.Module(new Uint8Array(s)), o = new WebAssembly.Instance(n, {
                                e: {
                                    f: t
                                }
                            }), a = o.exports.f;
                            return a;
                        }, wasmTableMirror = [], wasmTable = new WebAssembly.Table({
                            initial: 28,
                            element: "anyfunc"
                        }), getWasmTableEntry = (t)=>{
                            var e = wasmTableMirror[t];
                            return e || (t >= wasmTableMirror.length && (wasmTableMirror.length = t + 1), wasmTableMirror[t] = e = wasmTable.get(t)), e;
                        }, updateTableMap = (t, e)=>{
                            if (functionsInTableMap) for(var r = t; r < t + e; r++){
                                var s = getWasmTableEntry(r);
                                s && functionsInTableMap.set(s, r);
                            }
                        }, functionsInTableMap, getFunctionAddress = (t)=>(functionsInTableMap || (functionsInTableMap = new WeakMap, updateTableMap(0, wasmTable.length)), functionsInTableMap.get(t) || 0), freeTableIndexes = [], getEmptyTableSlot = ()=>{
                            if (freeTableIndexes.length) return freeTableIndexes.pop();
                            try {
                                wasmTable.grow(1);
                            } catch (t) {
                                throw t instanceof RangeError ? "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH." : t;
                            }
                            return wasmTable.length - 1;
                        }, setWasmTableEntry = (t, e)=>{
                            wasmTable.set(t, e), wasmTableMirror[t] = wasmTable.get(t);
                        }, addFunction = (t, e)=>{
                            var r = getFunctionAddress(t);
                            if (r) return r;
                            var s = getEmptyTableSlot();
                            try {
                                setWasmTableEntry(s, t);
                            } catch (o) {
                                if (!(o instanceof TypeError)) throw o;
                                var n = convertJsFunctionToWasm(t, e);
                                setWasmTableEntry(s, n);
                            }
                            return functionsInTableMap.set(t, s), s;
                        }, updateGOT = (t, e)=>{
                            for(var r in t)if (!isInternalSym(r)) {
                                var s = t[r];
                                r.startsWith("orig$") && (r = r.split("$")[1], e = !0), GOT[r] ||= new WebAssembly.Global({
                                    value: "i32",
                                    mutable: !0
                                }), (e || GOT[r].value == 0) && (typeof s == "function" ? GOT[r].value = addFunction(s) : typeof s == "number" ? GOT[r].value = s : err(`unhandled export type for '${r}': ${typeof s}`));
                            }
                        }, relocateExports = (t, e, r)=>{
                            var s = {};
                            for(var n in t){
                                var o = t[n];
                                typeof o == "object" && (o = o.value), typeof o == "number" && (o += e), s[n] = o;
                            }
                            return updateGOT(s, r), s;
                        }, isSymbolDefined = (t)=>{
                            var e = wasmImports[t];
                            return !(!e || e.stub);
                        }, dynCallLegacy = (t, e, r)=>{
                            t = t.replace(/p/g, "i");
                            var s = Module["dynCall_" + t];
                            return s(e, ...r);
                        }, dynCall = (t, e, r = [])=>{
                            if (t.includes("j")) return dynCallLegacy(t, e, r);
                            var s = getWasmTableEntry(e)(...r);
                            return s;
                        }, stackSave = ()=>_emscripten_stack_get_current(), stackRestore = (t)=>__emscripten_stack_restore(t), createInvokeFunction = (t)=>(e, ...r)=>{
                                var s = stackSave();
                                try {
                                    return dynCall(t, e, r);
                                } catch (n) {
                                    if (stackRestore(s), n !== n + 0) throw n;
                                    _setThrew(1, 0);
                                }
                            }, resolveGlobalSymbol = (t, e = !1)=>{
                            var r;
                            return e && "orig$" + t in wasmImports && (t = "orig$" + t), isSymbolDefined(t) ? r = wasmImports[t] : t.startsWith("invoke_") && (r = wasmImports[t] = createInvokeFunction(t.split("_")[1])), {
                                sym: r,
                                name: t
                            };
                        }, UTF8ToString = (t, e)=>t ? UTF8ArrayToString(HEAPU8, t, e) : "", loadWebAssemblyModule = (binary, flags, libName, localScope, handle)=>{
                            var metadata = getDylinkMetadata(binary);
                            currentModuleWeakSymbols = metadata.weakImports;
                            function loadModule() {
                                var firstLoad = !handle || !HEAP8[handle + 8];
                                if (firstLoad) {
                                    var memAlign = Math.pow(2, metadata.memoryAlign), memoryBase = metadata.memorySize ? alignMemory(getMemory(metadata.memorySize + memAlign), memAlign) : 0, tableBase = metadata.tableSize ? wasmTable.length : 0;
                                    handle && (HEAP8[handle + 8] = 1, LE_HEAP_STORE_U32((handle + 12 >> 2) * 4, memoryBase), LE_HEAP_STORE_I32((handle + 16 >> 2) * 4, metadata.memorySize), LE_HEAP_STORE_U32((handle + 20 >> 2) * 4, tableBase), LE_HEAP_STORE_I32((handle + 24 >> 2) * 4, metadata.tableSize));
                                } else memoryBase = LE_HEAP_LOAD_U32((handle + 12 >> 2) * 4), tableBase = LE_HEAP_LOAD_U32((handle + 20 >> 2) * 4);
                                var tableGrowthNeeded = tableBase + metadata.tableSize - wasmTable.length;
                                tableGrowthNeeded > 0 && wasmTable.grow(tableGrowthNeeded);
                                var moduleExports;
                                function resolveSymbol(t) {
                                    var e = resolveGlobalSymbol(t).sym;
                                    return !e && localScope && (e = localScope[t]), e || (e = moduleExports[t]), e;
                                }
                                var proxyHandler = {
                                    get (t, e) {
                                        switch(e){
                                            case "__memory_base":
                                                return memoryBase;
                                            case "__table_base":
                                                return tableBase;
                                        }
                                        if (e in wasmImports && !wasmImports[e].stub) return wasmImports[e];
                                        if (!(e in t)) {
                                            var r;
                                            t[e] = (...s)=>(r ||= resolveSymbol(e), r(...s));
                                        }
                                        return t[e];
                                    }
                                }, proxy = new Proxy({}, proxyHandler), info = {
                                    "GOT.mem": new Proxy({}, GOTHandler),
                                    "GOT.func": new Proxy({}, GOTHandler),
                                    env: proxy,
                                    wasi_snapshot_preview1: proxy
                                };
                                function postInstantiation(module, instance) {
                                    updateTableMap(tableBase, metadata.tableSize), moduleExports = relocateExports(instance.exports, memoryBase), flags.allowUndefined || reportUndefinedSymbols();
                                    function addEmAsm(addr, body) {
                                        for(var args = [], arity = 0; arity < 16 && body.indexOf("$" + arity) != -1; arity++)args.push("$" + arity);
                                        args = args.join(",");
                                        var func = `(${args}) => { ${body} };`;
                                        eval(func);
                                    }
                                    if ("__start_em_asm" in moduleExports) for(var start = moduleExports.__start_em_asm, stop = moduleExports.__stop_em_asm; start < stop;){
                                        var jsString = UTF8ToString(start);
                                        addEmAsm(start, jsString), start = HEAPU8.indexOf(0, start) + 1;
                                    }
                                    function addEmJs(name, cSig, body) {
                                        var jsArgs = [];
                                        if (cSig = cSig.slice(1, -1), cSig != "void") {
                                            cSig = cSig.split(",");
                                            for(var i in cSig){
                                                var jsArg = cSig[i].split(" ").pop();
                                                jsArgs.push(jsArg.replace("*", ""));
                                            }
                                        }
                                        var func = `(${jsArgs}) => ${body};`;
                                        moduleExports[name] = eval(func);
                                    }
                                    for(var name in moduleExports)if (name.startsWith("__em_js__")) {
                                        var start = moduleExports[name], jsString = UTF8ToString(start), parts = jsString.split("<::>");
                                        addEmJs(name.replace("__em_js__", ""), parts[0], parts[1]), delete moduleExports[name];
                                    }
                                    var applyRelocs = moduleExports.__wasm_apply_data_relocs;
                                    applyRelocs && (runtimeInitialized ? applyRelocs() : __RELOC_FUNCS__.push(applyRelocs));
                                    var init = moduleExports.__wasm_call_ctors;
                                    return init && (runtimeInitialized ? init() : __ATINIT__.push(init)), moduleExports;
                                }
                                if (flags.loadAsync) {
                                    if (binary instanceof WebAssembly.Module) {
                                        var instance = new WebAssembly.Instance(binary, info);
                                        return Promise.resolve(postInstantiation(binary, instance));
                                    }
                                    return WebAssembly.instantiate(binary, info).then((t)=>postInstantiation(t.module, t.instance));
                                }
                                var module = binary instanceof WebAssembly.Module ? binary : new WebAssembly.Module(binary), instance = new WebAssembly.Instance(module, info);
                                return postInstantiation(module, instance);
                            }
                            return flags.loadAsync ? metadata.neededDynlibs.reduce((t, e)=>t.then(()=>loadDynamicLibrary(e, flags, localScope)), Promise.resolve()).then(loadModule) : (metadata.neededDynlibs.forEach((t)=>loadDynamicLibrary(t, flags, localScope)), loadModule());
                        }, mergeLibSymbols = (t, e)=>{
                            for (var [r, s] of Object.entries(t)){
                                const n = (a)=>{
                                    isSymbolDefined(a) || (wasmImports[a] = s);
                                };
                                n(r);
                                const o = "__main_argc_argv";
                                r == "main" && n(o), r == o && n("main"), r.startsWith("dynCall_") && !Module.hasOwnProperty(r) && (Module[r] = s);
                            }
                        }, asyncLoad = (t, e, r, s)=>{
                            var n = s ? "" : `al ${t}`;
                            readAsync(t).then((o)=>{
                                e(new Uint8Array(o)), n && removeRunDependency();
                            }, (o)=>{
                                if (r) r();
                                else throw `Loading data file "${t}" failed.`;
                            }), n && addRunDependency();
                        };
                        function loadDynamicLibrary(t, e = {
                            global: !0,
                            nodelete: !0
                        }, r, s) {
                            var n = LDSO.loadedLibsByName[t];
                            if (n) return e.global ? n.global || (n.global = !0, mergeLibSymbols(n.exports)) : r && Object.assign(r, n.exports), e.nodelete && n.refcount !== 1 / 0 && (n.refcount = 1 / 0), n.refcount++, s && (LDSO.loadedLibsByHandle[s] = n), e.loadAsync ? Promise.resolve(!0) : !0;
                            n = newDSO(t, s, "loading"), n.refcount = e.nodelete ? 1 / 0 : 1, n.global = e.global;
                            function o() {
                                if (s) {
                                    var u = LE_HEAP_LOAD_U32((s + 28 >> 2) * 4), p = LE_HEAP_LOAD_U32((s + 32 >> 2) * 4);
                                    if (u && p) {
                                        var d = HEAP8.slice(u, u + p);
                                        return e.loadAsync ? Promise.resolve(d) : d;
                                    }
                                }
                                var c = locateFile(t);
                                if (e.loadAsync) return new Promise(function(m, h) {
                                    asyncLoad(c, m, h);
                                });
                                if (!readBinary) throw new Error(`${c}: file not found, and synchronous loading of external files is not available`);
                                return readBinary(c);
                            }
                            function a() {
                                return e.loadAsync ? o().then((u)=>loadWebAssemblyModule(u, e, t, r, s)) : loadWebAssemblyModule(o(), e, t, r, s);
                            }
                            function l(u) {
                                n.global ? mergeLibSymbols(u) : r && Object.assign(r, u), n.exports = u;
                            }
                            return e.loadAsync ? a().then((u)=>(l(u), !0)) : (l(a()), !0);
                        }
                        var reportUndefinedSymbols = ()=>{
                            for (var [t, e] of Object.entries(GOT))if (e.value == 0) {
                                var r = resolveGlobalSymbol(t, !0).sym;
                                if (!r && !e.required) continue;
                                if (typeof r == "function") e.value = addFunction(r, r.sig);
                                else if (typeof r == "number") e.value = r;
                                else throw new Error(`bad export type for '${t}': ${typeof r}`);
                            }
                        }, loadDylibs = ()=>{
                            if (!dynamicLibraries.length) {
                                reportUndefinedSymbols();
                                return;
                            }
                            addRunDependency(), dynamicLibraries.reduce((t, e)=>t.then(()=>loadDynamicLibrary(e, {
                                        loadAsync: !0,
                                        global: !0,
                                        nodelete: !0,
                                        allowUndefined: !0
                                    })), Promise.resolve()).then(()=>{
                                reportUndefinedSymbols(), removeRunDependency();
                            });
                        }, noExitRuntime = Module.noExitRuntime || !0;
                        function setValue(t, e, r = "i8") {
                            switch(r.endsWith("*") && (r = "*"), r){
                                case "i1":
                                    HEAP8[t] = e;
                                    break;
                                case "i8":
                                    HEAP8[t] = e;
                                    break;
                                case "i16":
                                    LE_HEAP_STORE_I16((t >> 1) * 2, e);
                                    break;
                                case "i32":
                                    LE_HEAP_STORE_I32((t >> 2) * 4, e);
                                    break;
                                case "i64":
                                    abort("to do setValue(i64) use WASM_BIGINT");
                                case "float":
                                    LE_HEAP_STORE_F32((t >> 2) * 4, e);
                                    break;
                                case "double":
                                    LE_HEAP_STORE_F64((t >> 3) * 8, e);
                                    break;
                                case "*":
                                    LE_HEAP_STORE_U32((t >> 2) * 4, e);
                                    break;
                                default:
                                    abort(`invalid type for setValue: ${r}`);
                            }
                        }
                        var ___memory_base = new WebAssembly.Global({
                            value: "i32",
                            mutable: !1
                        }, 1024), ___stack_pointer = new WebAssembly.Global({
                            value: "i32",
                            mutable: !0
                        }, 78112), ___table_base = new WebAssembly.Global({
                            value: "i32",
                            mutable: !1
                        }, 1), __abort_js = ()=>{
                            abort("");
                        };
                        __abort_js.sig = "v";
                        var nowIsMonotonic = 1, __emscripten_get_now_is_monotonic = ()=>nowIsMonotonic;
                        __emscripten_get_now_is_monotonic.sig = "i";
                        var __emscripten_memcpy_js = (t, e, r)=>HEAPU8.copyWithin(t, e, e + r);
                        __emscripten_memcpy_js.sig = "vppp";
                        var _emscripten_get_now;
                        _emscripten_get_now = ()=>performance.now(), _emscripten_get_now.sig = "d";
                        var getHeapMax = ()=>2147483648, growMemory = (t)=>{
                            var e = wasmMemory.buffer, r = (t - e.byteLength + 65535) / 65536;
                            try {
                                return wasmMemory.grow(r), updateMemoryViews(), 1;
                            } catch  {}
                        }, _emscripten_resize_heap = (t)=>{
                            var e = HEAPU8.length;
                            t >>>= 0;
                            var r = getHeapMax();
                            if (t > r) return !1;
                            for(var s = (u, p)=>u + (p - u % p) % p, n = 1; n <= 4; n *= 2){
                                var o = e * (1 + .2 / n);
                                o = Math.min(o, t + 100663296);
                                var a = Math.min(r, s(Math.max(t, o), 65536)), l = growMemory(a);
                                if (l) return !0;
                            }
                            return !1;
                        };
                        _emscripten_resize_heap.sig = "ip";
                        var _fd_close = (t)=>52;
                        _fd_close.sig = "ii";
                        function _fd_seek(t, e, r, s, n) {
                            return 70;
                        }
                        _fd_seek.sig = "iiiiip";
                        var printCharBuffers = [
                            null,
                            [],
                            []
                        ], printChar = (t, e)=>{
                            var r = printCharBuffers[t];
                            e === 0 || e === 10 ? ((t === 1 ? out : err)(UTF8ArrayToString(r, 0)), r.length = 0) : r.push(e);
                        }, _fd_write = (t, e, r, s)=>{
                            for(var n = 0, o = 0; o < r; o++){
                                var a = LE_HEAP_LOAD_U32((e >> 2) * 4), l = LE_HEAP_LOAD_U32((e + 4 >> 2) * 4);
                                e += 8;
                                for(var u = 0; u < l; u++)printChar(t, HEAPU8[a + u]);
                                n += l;
                            }
                            return LE_HEAP_STORE_U32((s >> 2) * 4, n), 0;
                        };
                        _fd_write.sig = "iippp";
                        function _tree_sitter_log_callback(t, e) {
                            if (currentLogCallback) {
                                const r = UTF8ToString(e);
                                currentLogCallback(r, t !== 0);
                            }
                        }
                        function _tree_sitter_parse_callback(t, e, r, s, n) {
                            const a = currentParseCallback(e, {
                                row: r,
                                column: s
                            });
                            typeof a == "string" ? (setValue(n, a.length, "i32"), stringToUTF16(a, t, 10240)) : setValue(n, 0, "i32");
                        }
                        var runtimeKeepaliveCounter = 0, keepRuntimeAlive = ()=>noExitRuntime || runtimeKeepaliveCounter > 0, _proc_exit = (t)=>{
                            EXITSTATUS = t, keepRuntimeAlive() || (Module.onExit?.(t), ABORT = !0), quit_(t, new ExitStatus(t));
                        };
                        _proc_exit.sig = "vi";
                        var exitJS = (t, e)=>{
                            EXITSTATUS = t, _proc_exit(t);
                        }, handleException = (t)=>{
                            if (t instanceof ExitStatus || t == "unwind") return EXITSTATUS;
                            quit_(1, t);
                        }, lengthBytesUTF8 = (t)=>{
                            for(var e = 0, r = 0; r < t.length; ++r){
                                var s = t.charCodeAt(r);
                                s <= 127 ? e++ : s <= 2047 ? e += 2 : s >= 55296 && s <= 57343 ? (e += 4, ++r) : e += 3;
                            }
                            return e;
                        }, stringToUTF8Array = (t, e, r, s)=>{
                            if (!(s > 0)) return 0;
                            for(var n = r, o = r + s - 1, a = 0; a < t.length; ++a){
                                var l = t.charCodeAt(a);
                                if (l >= 55296 && l <= 57343) {
                                    var u = t.charCodeAt(++a);
                                    l = 65536 + ((l & 1023) << 10) | u & 1023;
                                }
                                if (l <= 127) {
                                    if (r >= o) break;
                                    e[r++] = l;
                                } else if (l <= 2047) {
                                    if (r + 1 >= o) break;
                                    e[r++] = 192 | l >> 6, e[r++] = 128 | l & 63;
                                } else if (l <= 65535) {
                                    if (r + 2 >= o) break;
                                    e[r++] = 224 | l >> 12, e[r++] = 128 | l >> 6 & 63, e[r++] = 128 | l & 63;
                                } else {
                                    if (r + 3 >= o) break;
                                    e[r++] = 240 | l >> 18, e[r++] = 128 | l >> 12 & 63, e[r++] = 128 | l >> 6 & 63, e[r++] = 128 | l & 63;
                                }
                            }
                            return e[r] = 0, r - n;
                        }, stringToUTF8 = (t, e, r)=>stringToUTF8Array(t, HEAPU8, e, r), stackAlloc = (t)=>__emscripten_stack_alloc(t), stringToUTF8OnStack = (t)=>{
                            var e = lengthBytesUTF8(t) + 1, r = stackAlloc(e);
                            return stringToUTF8(t, r, e), r;
                        }, stringToUTF16 = (t, e, r)=>{
                            if (r ??= 2147483647, r < 2) return 0;
                            r -= 2;
                            for(var s = e, n = r < t.length * 2 ? r / 2 : t.length, o = 0; o < n; ++o){
                                var a = t.charCodeAt(o);
                                LE_HEAP_STORE_I16((e >> 1) * 2, a), e += 2;
                            }
                            return LE_HEAP_STORE_I16((e >> 1) * 2, 0), e - s;
                        }, AsciiToString = (t)=>{
                            for(var e = "";;){
                                var r = HEAPU8[t++];
                                if (!r) return e;
                                e += String.fromCharCode(r);
                            }
                        }, wasmImports = {
                            __heap_base: ___heap_base,
                            __indirect_function_table: wasmTable,
                            __memory_base: ___memory_base,
                            __stack_pointer: ___stack_pointer,
                            __table_base: ___table_base,
                            _abort_js: __abort_js,
                            _emscripten_get_now_is_monotonic: __emscripten_get_now_is_monotonic,
                            _emscripten_memcpy_js: __emscripten_memcpy_js,
                            emscripten_get_now: _emscripten_get_now,
                            emscripten_resize_heap: _emscripten_resize_heap,
                            fd_close: _fd_close,
                            fd_seek: _fd_seek,
                            fd_write: _fd_write,
                            memory: wasmMemory,
                            tree_sitter_log_callback: _tree_sitter_log_callback,
                            tree_sitter_parse_callback: _tree_sitter_parse_callback
                        }, wasmExports = createWasm(), _malloc = Module._malloc = (t)=>(_malloc = Module._malloc = wasmExports.malloc)(t);
                        Module._calloc = (t, e)=>(Module._calloc = wasmExports.calloc)(t, e), Module._realloc = (t, e)=>(Module._realloc = wasmExports.realloc)(t, e), Module._free = (t)=>(Module._free = wasmExports.free)(t), Module._ts_language_symbol_count = (t)=>(Module._ts_language_symbol_count = wasmExports.ts_language_symbol_count)(t), Module._ts_language_state_count = (t)=>(Module._ts_language_state_count = wasmExports.ts_language_state_count)(t), Module._ts_language_version = (t)=>(Module._ts_language_version = wasmExports.ts_language_version)(t), Module._ts_language_field_count = (t)=>(Module._ts_language_field_count = wasmExports.ts_language_field_count)(t), Module._ts_language_next_state = (t, e, r)=>(Module._ts_language_next_state = wasmExports.ts_language_next_state)(t, e, r), Module._ts_language_symbol_name = (t, e)=>(Module._ts_language_symbol_name = wasmExports.ts_language_symbol_name)(t, e), Module._ts_language_symbol_for_name = (t, e, r, s)=>(Module._ts_language_symbol_for_name = wasmExports.ts_language_symbol_for_name)(t, e, r, s), Module._strncmp = (t, e, r)=>(Module._strncmp = wasmExports.strncmp)(t, e, r), Module._ts_language_symbol_type = (t, e)=>(Module._ts_language_symbol_type = wasmExports.ts_language_symbol_type)(t, e), Module._ts_language_field_name_for_id = (t, e)=>(Module._ts_language_field_name_for_id = wasmExports.ts_language_field_name_for_id)(t, e), Module._ts_lookahead_iterator_new = (t, e)=>(Module._ts_lookahead_iterator_new = wasmExports.ts_lookahead_iterator_new)(t, e), Module._ts_lookahead_iterator_delete = (t)=>(Module._ts_lookahead_iterator_delete = wasmExports.ts_lookahead_iterator_delete)(t), Module._ts_lookahead_iterator_reset_state = (t, e)=>(Module._ts_lookahead_iterator_reset_state = wasmExports.ts_lookahead_iterator_reset_state)(t, e), Module._ts_lookahead_iterator_reset = (t, e, r)=>(Module._ts_lookahead_iterator_reset = wasmExports.ts_lookahead_iterator_reset)(t, e, r), Module._ts_lookahead_iterator_next = (t)=>(Module._ts_lookahead_iterator_next = wasmExports.ts_lookahead_iterator_next)(t), Module._ts_lookahead_iterator_current_symbol = (t)=>(Module._ts_lookahead_iterator_current_symbol = wasmExports.ts_lookahead_iterator_current_symbol)(t), Module._memset = (t, e, r)=>(Module._memset = wasmExports.memset)(t, e, r), Module._memcpy = (t, e, r)=>(Module._memcpy = wasmExports.memcpy)(t, e, r), Module._ts_parser_delete = (t)=>(Module._ts_parser_delete = wasmExports.ts_parser_delete)(t), Module._ts_parser_reset = (t)=>(Module._ts_parser_reset = wasmExports.ts_parser_reset)(t), Module._ts_parser_set_language = (t, e)=>(Module._ts_parser_set_language = wasmExports.ts_parser_set_language)(t, e), Module._ts_parser_timeout_micros = (t)=>(Module._ts_parser_timeout_micros = wasmExports.ts_parser_timeout_micros)(t), Module._ts_parser_set_timeout_micros = (t, e, r)=>(Module._ts_parser_set_timeout_micros = wasmExports.ts_parser_set_timeout_micros)(t, e, r), Module._ts_parser_set_included_ranges = (t, e, r)=>(Module._ts_parser_set_included_ranges = wasmExports.ts_parser_set_included_ranges)(t, e, r), Module._memmove = (t, e, r)=>(Module._memmove = wasmExports.memmove)(t, e, r), Module._memcmp = (t, e, r)=>(Module._memcmp = wasmExports.memcmp)(t, e, r), Module._ts_query_new = (t, e, r, s, n)=>(Module._ts_query_new = wasmExports.ts_query_new)(t, e, r, s, n), Module._ts_query_delete = (t)=>(Module._ts_query_delete = wasmExports.ts_query_delete)(t), Module._iswspace = (t)=>(Module._iswspace = wasmExports.iswspace)(t), Module._iswalnum = (t)=>(Module._iswalnum = wasmExports.iswalnum)(t), Module._ts_query_pattern_count = (t)=>(Module._ts_query_pattern_count = wasmExports.ts_query_pattern_count)(t), Module._ts_query_capture_count = (t)=>(Module._ts_query_capture_count = wasmExports.ts_query_capture_count)(t), Module._ts_query_string_count = (t)=>(Module._ts_query_string_count = wasmExports.ts_query_string_count)(t), Module._ts_query_capture_name_for_id = (t, e, r)=>(Module._ts_query_capture_name_for_id = wasmExports.ts_query_capture_name_for_id)(t, e, r), Module._ts_query_string_value_for_id = (t, e, r)=>(Module._ts_query_string_value_for_id = wasmExports.ts_query_string_value_for_id)(t, e, r), Module._ts_query_predicates_for_pattern = (t, e, r)=>(Module._ts_query_predicates_for_pattern = wasmExports.ts_query_predicates_for_pattern)(t, e, r), Module._ts_query_disable_capture = (t, e, r)=>(Module._ts_query_disable_capture = wasmExports.ts_query_disable_capture)(t, e, r), Module._ts_tree_copy = (t)=>(Module._ts_tree_copy = wasmExports.ts_tree_copy)(t), Module._ts_tree_delete = (t)=>(Module._ts_tree_delete = wasmExports.ts_tree_delete)(t), Module._ts_init = ()=>(Module._ts_init = wasmExports.ts_init)(), Module._ts_parser_new_wasm = ()=>(Module._ts_parser_new_wasm = wasmExports.ts_parser_new_wasm)(), Module._ts_parser_enable_logger_wasm = (t, e)=>(Module._ts_parser_enable_logger_wasm = wasmExports.ts_parser_enable_logger_wasm)(t, e), Module._ts_parser_parse_wasm = (t, e, r, s, n)=>(Module._ts_parser_parse_wasm = wasmExports.ts_parser_parse_wasm)(t, e, r, s, n), Module._ts_parser_included_ranges_wasm = (t)=>(Module._ts_parser_included_ranges_wasm = wasmExports.ts_parser_included_ranges_wasm)(t), Module._ts_language_type_is_named_wasm = (t, e)=>(Module._ts_language_type_is_named_wasm = wasmExports.ts_language_type_is_named_wasm)(t, e), Module._ts_language_type_is_visible_wasm = (t, e)=>(Module._ts_language_type_is_visible_wasm = wasmExports.ts_language_type_is_visible_wasm)(t, e), Module._ts_tree_root_node_wasm = (t)=>(Module._ts_tree_root_node_wasm = wasmExports.ts_tree_root_node_wasm)(t), Module._ts_tree_root_node_with_offset_wasm = (t)=>(Module._ts_tree_root_node_with_offset_wasm = wasmExports.ts_tree_root_node_with_offset_wasm)(t), Module._ts_tree_edit_wasm = (t)=>(Module._ts_tree_edit_wasm = wasmExports.ts_tree_edit_wasm)(t), Module._ts_tree_included_ranges_wasm = (t)=>(Module._ts_tree_included_ranges_wasm = wasmExports.ts_tree_included_ranges_wasm)(t), Module._ts_tree_get_changed_ranges_wasm = (t, e)=>(Module._ts_tree_get_changed_ranges_wasm = wasmExports.ts_tree_get_changed_ranges_wasm)(t, e), Module._ts_tree_cursor_new_wasm = (t)=>(Module._ts_tree_cursor_new_wasm = wasmExports.ts_tree_cursor_new_wasm)(t), Module._ts_tree_cursor_delete_wasm = (t)=>(Module._ts_tree_cursor_delete_wasm = wasmExports.ts_tree_cursor_delete_wasm)(t), Module._ts_tree_cursor_reset_wasm = (t)=>(Module._ts_tree_cursor_reset_wasm = wasmExports.ts_tree_cursor_reset_wasm)(t), Module._ts_tree_cursor_reset_to_wasm = (t, e)=>(Module._ts_tree_cursor_reset_to_wasm = wasmExports.ts_tree_cursor_reset_to_wasm)(t, e), Module._ts_tree_cursor_goto_first_child_wasm = (t)=>(Module._ts_tree_cursor_goto_first_child_wasm = wasmExports.ts_tree_cursor_goto_first_child_wasm)(t), Module._ts_tree_cursor_goto_last_child_wasm = (t)=>(Module._ts_tree_cursor_goto_last_child_wasm = wasmExports.ts_tree_cursor_goto_last_child_wasm)(t), Module._ts_tree_cursor_goto_first_child_for_index_wasm = (t)=>(Module._ts_tree_cursor_goto_first_child_for_index_wasm = wasmExports.ts_tree_cursor_goto_first_child_for_index_wasm)(t), Module._ts_tree_cursor_goto_first_child_for_position_wasm = (t)=>(Module._ts_tree_cursor_goto_first_child_for_position_wasm = wasmExports.ts_tree_cursor_goto_first_child_for_position_wasm)(t), Module._ts_tree_cursor_goto_next_sibling_wasm = (t)=>(Module._ts_tree_cursor_goto_next_sibling_wasm = wasmExports.ts_tree_cursor_goto_next_sibling_wasm)(t), Module._ts_tree_cursor_goto_previous_sibling_wasm = (t)=>(Module._ts_tree_cursor_goto_previous_sibling_wasm = wasmExports.ts_tree_cursor_goto_previous_sibling_wasm)(t), Module._ts_tree_cursor_goto_descendant_wasm = (t, e)=>(Module._ts_tree_cursor_goto_descendant_wasm = wasmExports.ts_tree_cursor_goto_descendant_wasm)(t, e), Module._ts_tree_cursor_goto_parent_wasm = (t)=>(Module._ts_tree_cursor_goto_parent_wasm = wasmExports.ts_tree_cursor_goto_parent_wasm)(t), Module._ts_tree_cursor_current_node_type_id_wasm = (t)=>(Module._ts_tree_cursor_current_node_type_id_wasm = wasmExports.ts_tree_cursor_current_node_type_id_wasm)(t), Module._ts_tree_cursor_current_node_state_id_wasm = (t)=>(Module._ts_tree_cursor_current_node_state_id_wasm = wasmExports.ts_tree_cursor_current_node_state_id_wasm)(t), Module._ts_tree_cursor_current_node_is_named_wasm = (t)=>(Module._ts_tree_cursor_current_node_is_named_wasm = wasmExports.ts_tree_cursor_current_node_is_named_wasm)(t), Module._ts_tree_cursor_current_node_is_missing_wasm = (t)=>(Module._ts_tree_cursor_current_node_is_missing_wasm = wasmExports.ts_tree_cursor_current_node_is_missing_wasm)(t), Module._ts_tree_cursor_current_node_id_wasm = (t)=>(Module._ts_tree_cursor_current_node_id_wasm = wasmExports.ts_tree_cursor_current_node_id_wasm)(t), Module._ts_tree_cursor_start_position_wasm = (t)=>(Module._ts_tree_cursor_start_position_wasm = wasmExports.ts_tree_cursor_start_position_wasm)(t), Module._ts_tree_cursor_end_position_wasm = (t)=>(Module._ts_tree_cursor_end_position_wasm = wasmExports.ts_tree_cursor_end_position_wasm)(t), Module._ts_tree_cursor_start_index_wasm = (t)=>(Module._ts_tree_cursor_start_index_wasm = wasmExports.ts_tree_cursor_start_index_wasm)(t), Module._ts_tree_cursor_end_index_wasm = (t)=>(Module._ts_tree_cursor_end_index_wasm = wasmExports.ts_tree_cursor_end_index_wasm)(t), Module._ts_tree_cursor_current_field_id_wasm = (t)=>(Module._ts_tree_cursor_current_field_id_wasm = wasmExports.ts_tree_cursor_current_field_id_wasm)(t), Module._ts_tree_cursor_current_depth_wasm = (t)=>(Module._ts_tree_cursor_current_depth_wasm = wasmExports.ts_tree_cursor_current_depth_wasm)(t), Module._ts_tree_cursor_current_descendant_index_wasm = (t)=>(Module._ts_tree_cursor_current_descendant_index_wasm = wasmExports.ts_tree_cursor_current_descendant_index_wasm)(t), Module._ts_tree_cursor_current_node_wasm = (t)=>(Module._ts_tree_cursor_current_node_wasm = wasmExports.ts_tree_cursor_current_node_wasm)(t), Module._ts_node_symbol_wasm = (t)=>(Module._ts_node_symbol_wasm = wasmExports.ts_node_symbol_wasm)(t), Module._ts_node_field_name_for_child_wasm = (t, e)=>(Module._ts_node_field_name_for_child_wasm = wasmExports.ts_node_field_name_for_child_wasm)(t, e), Module._ts_node_children_by_field_id_wasm = (t, e)=>(Module._ts_node_children_by_field_id_wasm = wasmExports.ts_node_children_by_field_id_wasm)(t, e), Module._ts_node_first_child_for_byte_wasm = (t)=>(Module._ts_node_first_child_for_byte_wasm = wasmExports.ts_node_first_child_for_byte_wasm)(t), Module._ts_node_first_named_child_for_byte_wasm = (t)=>(Module._ts_node_first_named_child_for_byte_wasm = wasmExports.ts_node_first_named_child_for_byte_wasm)(t), Module._ts_node_grammar_symbol_wasm = (t)=>(Module._ts_node_grammar_symbol_wasm = wasmExports.ts_node_grammar_symbol_wasm)(t), Module._ts_node_child_count_wasm = (t)=>(Module._ts_node_child_count_wasm = wasmExports.ts_node_child_count_wasm)(t), Module._ts_node_named_child_count_wasm = (t)=>(Module._ts_node_named_child_count_wasm = wasmExports.ts_node_named_child_count_wasm)(t), Module._ts_node_child_wasm = (t, e)=>(Module._ts_node_child_wasm = wasmExports.ts_node_child_wasm)(t, e), Module._ts_node_named_child_wasm = (t, e)=>(Module._ts_node_named_child_wasm = wasmExports.ts_node_named_child_wasm)(t, e), Module._ts_node_child_by_field_id_wasm = (t, e)=>(Module._ts_node_child_by_field_id_wasm = wasmExports.ts_node_child_by_field_id_wasm)(t, e), Module._ts_node_next_sibling_wasm = (t)=>(Module._ts_node_next_sibling_wasm = wasmExports.ts_node_next_sibling_wasm)(t), Module._ts_node_prev_sibling_wasm = (t)=>(Module._ts_node_prev_sibling_wasm = wasmExports.ts_node_prev_sibling_wasm)(t), Module._ts_node_next_named_sibling_wasm = (t)=>(Module._ts_node_next_named_sibling_wasm = wasmExports.ts_node_next_named_sibling_wasm)(t), Module._ts_node_prev_named_sibling_wasm = (t)=>(Module._ts_node_prev_named_sibling_wasm = wasmExports.ts_node_prev_named_sibling_wasm)(t), Module._ts_node_descendant_count_wasm = (t)=>(Module._ts_node_descendant_count_wasm = wasmExports.ts_node_descendant_count_wasm)(t), Module._ts_node_parent_wasm = (t)=>(Module._ts_node_parent_wasm = wasmExports.ts_node_parent_wasm)(t), Module._ts_node_descendant_for_index_wasm = (t)=>(Module._ts_node_descendant_for_index_wasm = wasmExports.ts_node_descendant_for_index_wasm)(t), Module._ts_node_named_descendant_for_index_wasm = (t)=>(Module._ts_node_named_descendant_for_index_wasm = wasmExports.ts_node_named_descendant_for_index_wasm)(t), Module._ts_node_descendant_for_position_wasm = (t)=>(Module._ts_node_descendant_for_position_wasm = wasmExports.ts_node_descendant_for_position_wasm)(t), Module._ts_node_named_descendant_for_position_wasm = (t)=>(Module._ts_node_named_descendant_for_position_wasm = wasmExports.ts_node_named_descendant_for_position_wasm)(t), Module._ts_node_start_point_wasm = (t)=>(Module._ts_node_start_point_wasm = wasmExports.ts_node_start_point_wasm)(t), Module._ts_node_end_point_wasm = (t)=>(Module._ts_node_end_point_wasm = wasmExports.ts_node_end_point_wasm)(t), Module._ts_node_start_index_wasm = (t)=>(Module._ts_node_start_index_wasm = wasmExports.ts_node_start_index_wasm)(t), Module._ts_node_end_index_wasm = (t)=>(Module._ts_node_end_index_wasm = wasmExports.ts_node_end_index_wasm)(t), Module._ts_node_to_string_wasm = (t)=>(Module._ts_node_to_string_wasm = wasmExports.ts_node_to_string_wasm)(t), Module._ts_node_children_wasm = (t)=>(Module._ts_node_children_wasm = wasmExports.ts_node_children_wasm)(t), Module._ts_node_named_children_wasm = (t)=>(Module._ts_node_named_children_wasm = wasmExports.ts_node_named_children_wasm)(t), Module._ts_node_descendants_of_type_wasm = (t, e, r, s, n, o, a)=>(Module._ts_node_descendants_of_type_wasm = wasmExports.ts_node_descendants_of_type_wasm)(t, e, r, s, n, o, a), Module._ts_node_is_named_wasm = (t)=>(Module._ts_node_is_named_wasm = wasmExports.ts_node_is_named_wasm)(t), Module._ts_node_has_changes_wasm = (t)=>(Module._ts_node_has_changes_wasm = wasmExports.ts_node_has_changes_wasm)(t), Module._ts_node_has_error_wasm = (t)=>(Module._ts_node_has_error_wasm = wasmExports.ts_node_has_error_wasm)(t), Module._ts_node_is_error_wasm = (t)=>(Module._ts_node_is_error_wasm = wasmExports.ts_node_is_error_wasm)(t), Module._ts_node_is_missing_wasm = (t)=>(Module._ts_node_is_missing_wasm = wasmExports.ts_node_is_missing_wasm)(t), Module._ts_node_is_extra_wasm = (t)=>(Module._ts_node_is_extra_wasm = wasmExports.ts_node_is_extra_wasm)(t), Module._ts_node_parse_state_wasm = (t)=>(Module._ts_node_parse_state_wasm = wasmExports.ts_node_parse_state_wasm)(t), Module._ts_node_next_parse_state_wasm = (t)=>(Module._ts_node_next_parse_state_wasm = wasmExports.ts_node_next_parse_state_wasm)(t), Module._ts_query_matches_wasm = (t, e, r, s, n, o, a, l, u, p, d)=>(Module._ts_query_matches_wasm = wasmExports.ts_query_matches_wasm)(t, e, r, s, n, o, a, l, u, p, d), Module._ts_query_captures_wasm = (t, e, r, s, n, o, a, l, u, p, d)=>(Module._ts_query_captures_wasm = wasmExports.ts_query_captures_wasm)(t, e, r, s, n, o, a, l, u, p, d), Module._iswalpha = (t)=>(Module._iswalpha = wasmExports.iswalpha)(t), Module._iswblank = (t)=>(Module._iswblank = wasmExports.iswblank)(t), Module._iswdigit = (t)=>(Module._iswdigit = wasmExports.iswdigit)(t), Module._iswlower = (t)=>(Module._iswlower = wasmExports.iswlower)(t), Module._iswupper = (t)=>(Module._iswupper = wasmExports.iswupper)(t), Module._iswxdigit = (t)=>(Module._iswxdigit = wasmExports.iswxdigit)(t), Module._memchr = (t, e, r)=>(Module._memchr = wasmExports.memchr)(t, e, r), Module._strlen = (t)=>(Module._strlen = wasmExports.strlen)(t), Module._strcmp = (t, e)=>(Module._strcmp = wasmExports.strcmp)(t, e), Module._strncat = (t, e, r)=>(Module._strncat = wasmExports.strncat)(t, e, r), Module._strncpy = (t, e, r)=>(Module._strncpy = wasmExports.strncpy)(t, e, r), Module._towlower = (t)=>(Module._towlower = wasmExports.towlower)(t), Module._towupper = (t)=>(Module._towupper = wasmExports.towupper)(t);
                        var _setThrew = (t, e)=>(_setThrew = wasmExports.setThrew)(t, e), __emscripten_stack_restore = (t)=>(__emscripten_stack_restore = wasmExports._emscripten_stack_restore)(t), __emscripten_stack_alloc = (t)=>(__emscripten_stack_alloc = wasmExports._emscripten_stack_alloc)(t), _emscripten_stack_get_current = ()=>(_emscripten_stack_get_current = wasmExports.emscripten_stack_get_current)();
                        Module.dynCall_jiji = (t, e, r, s, n)=>(Module.dynCall_jiji = wasmExports.dynCall_jiji)(t, e, r, s, n), Module._orig$ts_parser_timeout_micros = (t)=>(Module._orig$ts_parser_timeout_micros = wasmExports.orig$ts_parser_timeout_micros)(t), Module._orig$ts_parser_set_timeout_micros = (t, e)=>(Module._orig$ts_parser_set_timeout_micros = wasmExports.orig$ts_parser_set_timeout_micros)(t, e), Module.AsciiToString = AsciiToString, Module.stringToUTF16 = stringToUTF16;
                        var calledRun;
                        dependenciesFulfilled = function t() {
                            calledRun || run(), calledRun || (dependenciesFulfilled = t);
                        };
                        function callMain(t = []) {
                            var e = resolveGlobalSymbol("main").sym;
                            if (e) {
                                t.unshift(thisProgram);
                                var r = t.length, s = stackAlloc((r + 1) * 4), n = s;
                                t.forEach((a)=>{
                                    LE_HEAP_STORE_U32((n >> 2) * 4, stringToUTF8OnStack(a)), n += 4;
                                }), LE_HEAP_STORE_U32((n >> 2) * 4, 0);
                                try {
                                    var o = e(r, s);
                                    return exitJS(o, !0), o;
                                } catch (a) {
                                    return handleException(a);
                                }
                            }
                        }
                        function run(t = arguments_) {
                            if (runDependencies > 0 || (preRun(), runDependencies > 0)) return;
                            function e() {
                                calledRun || (calledRun = !0, Module.calledRun = !0, !ABORT && (initRuntime(), preMain(), Module.onRuntimeInitialized?.(), shouldRunNow && callMain(t), postRun()));
                            }
                            Module.setStatus ? (Module.setStatus("Running..."), setTimeout(function() {
                                setTimeout(function() {
                                    Module.setStatus("");
                                }, 1), e();
                            }, 1)) : e();
                        }
                        if (Module.preInit) for(typeof Module.preInit == "function" && (Module.preInit = [
                            Module.preInit
                        ]); Module.preInit.length > 0;)Module.preInit.pop()();
                        var shouldRunNow = !0;
                        Module.noInitialRun && (shouldRunNow = !1), run();
                        const C = Module, INTERNAL = {}, SIZE_OF_INT = 4, SIZE_OF_CURSOR = 4 * SIZE_OF_INT, SIZE_OF_NODE = 5 * SIZE_OF_INT, SIZE_OF_POINT = 2 * SIZE_OF_INT, SIZE_OF_RANGE = 2 * SIZE_OF_INT + 2 * SIZE_OF_POINT, ZERO_POINT = {
                            row: 0,
                            column: 0
                        }, QUERY_WORD_REGEX = /[\w-.]*/g, PREDICATE_STEP_TYPE_CAPTURE = 1, PREDICATE_STEP_TYPE_STRING = 2, LANGUAGE_FUNCTION_REGEX = /^_?tree_sitter_\w+/;
                        let VERSION, MIN_COMPATIBLE_VERSION, TRANSFER_BUFFER, currentParseCallback, currentLogCallback;
                        class ParserImpl {
                            static init() {
                                TRANSFER_BUFFER = C._ts_init(), VERSION = getValue(TRANSFER_BUFFER, "i32"), MIN_COMPATIBLE_VERSION = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
                            }
                            initialize() {
                                C._ts_parser_new_wasm(), this[0] = getValue(TRANSFER_BUFFER, "i32"), this[1] = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
                            }
                            delete() {
                                C._ts_parser_delete(this[0]), C._free(this[1]), this[0] = 0, this[1] = 0;
                            }
                            setLanguage(e) {
                                let r;
                                if (!e) r = 0, e = null;
                                else if (e.constructor === Language) {
                                    r = e[0];
                                    const s = C._ts_language_version(r);
                                    if (s < MIN_COMPATIBLE_VERSION || VERSION < s) throw new Error(`Incompatible language version ${s}. Compatibility range ${MIN_COMPATIBLE_VERSION} through ${VERSION}.`);
                                } else throw new Error("Argument must be a Language");
                                return this.language = e, C._ts_parser_set_language(this[0], r), this;
                            }
                            getLanguage() {
                                return this.language;
                            }
                            parse(e, r, s) {
                                if (typeof e == "string") currentParseCallback = (u, p)=>e.slice(u);
                                else if (typeof e == "function") currentParseCallback = e;
                                else throw new Error("Argument must be a string or a function");
                                this.logCallback ? (currentLogCallback = this.logCallback, C._ts_parser_enable_logger_wasm(this[0], 1)) : (currentLogCallback = null, C._ts_parser_enable_logger_wasm(this[0], 0));
                                let n = 0, o = 0;
                                if (s?.includedRanges) {
                                    n = s.includedRanges.length, o = C._calloc(n, SIZE_OF_RANGE);
                                    let u = o;
                                    for(let p = 0; p < n; p++)marshalRange(u, s.includedRanges[p]), u += SIZE_OF_RANGE;
                                }
                                const a = C._ts_parser_parse_wasm(this[0], this[1], r ? r[0] : 0, o, n);
                                if (!a) throw currentParseCallback = null, currentLogCallback = null, new Error("Parsing failed");
                                const l = new Tree(INTERNAL, a, this.language, currentParseCallback);
                                return currentParseCallback = null, currentLogCallback = null, l;
                            }
                            reset() {
                                C._ts_parser_reset(this[0]);
                            }
                            getIncludedRanges() {
                                C._ts_parser_included_ranges_wasm(this[0]);
                                const e = getValue(TRANSFER_BUFFER, "i32"), r = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"), s = new Array(e);
                                if (e > 0) {
                                    let n = r;
                                    for(let o = 0; o < e; o++)s[o] = unmarshalRange(n), n += SIZE_OF_RANGE;
                                    C._free(r);
                                }
                                return s;
                            }
                            getTimeoutMicros() {
                                return C._ts_parser_timeout_micros(this[0]);
                            }
                            setTimeoutMicros(e) {
                                C._ts_parser_set_timeout_micros(this[0], e);
                            }
                            setLogger(e) {
                                if (!e) e = null;
                                else if (typeof e != "function") throw new Error("Logger callback must be a function");
                                return this.logCallback = e, this;
                            }
                            getLogger() {
                                return this.logCallback;
                            }
                        }
                        class Tree {
                            constructor(e, r, s, n){
                                assertInternal(e), this[0] = r, this.language = s, this.textCallback = n;
                            }
                            copy() {
                                const e = C._ts_tree_copy(this[0]);
                                return new Tree(INTERNAL, e, this.language, this.textCallback);
                            }
                            delete() {
                                C._ts_tree_delete(this[0]), this[0] = 0;
                            }
                            edit(e) {
                                marshalEdit(e), C._ts_tree_edit_wasm(this[0]);
                            }
                            get rootNode() {
                                return C._ts_tree_root_node_wasm(this[0]), unmarshalNode(this);
                            }
                            rootNodeWithOffset(e, r) {
                                const s = TRANSFER_BUFFER + SIZE_OF_NODE;
                                return setValue(s, e, "i32"), marshalPoint(s + SIZE_OF_INT, r), C._ts_tree_root_node_with_offset_wasm(this[0]), unmarshalNode(this);
                            }
                            getLanguage() {
                                return this.language;
                            }
                            walk() {
                                return this.rootNode.walk();
                            }
                            getChangedRanges(e) {
                                if (e.constructor !== Tree) throw new TypeError("Argument must be a Tree");
                                C._ts_tree_get_changed_ranges_wasm(this[0], e[0]);
                                const r = getValue(TRANSFER_BUFFER, "i32"), s = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"), n = new Array(r);
                                if (r > 0) {
                                    let o = s;
                                    for(let a = 0; a < r; a++)n[a] = unmarshalRange(o), o += SIZE_OF_RANGE;
                                    C._free(s);
                                }
                                return n;
                            }
                            getIncludedRanges() {
                                C._ts_tree_included_ranges_wasm(this[0]);
                                const e = getValue(TRANSFER_BUFFER, "i32"), r = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"), s = new Array(e);
                                if (e > 0) {
                                    let n = r;
                                    for(let o = 0; o < e; o++)s[o] = unmarshalRange(n), n += SIZE_OF_RANGE;
                                    C._free(r);
                                }
                                return s;
                            }
                        }
                        class Node {
                            constructor(e, r){
                                assertInternal(e), this.tree = r;
                            }
                            get typeId() {
                                return marshalNode(this), C._ts_node_symbol_wasm(this.tree[0]);
                            }
                            get grammarId() {
                                return marshalNode(this), C._ts_node_grammar_symbol_wasm(this.tree[0]);
                            }
                            get type() {
                                return this.tree.language.types[this.typeId] || "ERROR";
                            }
                            get grammarType() {
                                return this.tree.language.types[this.grammarId] || "ERROR";
                            }
                            get endPosition() {
                                return marshalNode(this), C._ts_node_end_point_wasm(this.tree[0]), unmarshalPoint(TRANSFER_BUFFER);
                            }
                            get endIndex() {
                                return marshalNode(this), C._ts_node_end_index_wasm(this.tree[0]);
                            }
                            get text() {
                                return getText(this.tree, this.startIndex, this.endIndex);
                            }
                            get parseState() {
                                return marshalNode(this), C._ts_node_parse_state_wasm(this.tree[0]);
                            }
                            get nextParseState() {
                                return marshalNode(this), C._ts_node_next_parse_state_wasm(this.tree[0]);
                            }
                            get isNamed() {
                                return marshalNode(this), C._ts_node_is_named_wasm(this.tree[0]) === 1;
                            }
                            get hasError() {
                                return marshalNode(this), C._ts_node_has_error_wasm(this.tree[0]) === 1;
                            }
                            get hasChanges() {
                                return marshalNode(this), C._ts_node_has_changes_wasm(this.tree[0]) === 1;
                            }
                            get isError() {
                                return marshalNode(this), C._ts_node_is_error_wasm(this.tree[0]) === 1;
                            }
                            get isMissing() {
                                return marshalNode(this), C._ts_node_is_missing_wasm(this.tree[0]) === 1;
                            }
                            get isExtra() {
                                return marshalNode(this), C._ts_node_is_extra_wasm(this.tree[0]) === 1;
                            }
                            equals(e) {
                                return this.id === e.id;
                            }
                            child(e) {
                                return marshalNode(this), C._ts_node_child_wasm(this.tree[0], e), unmarshalNode(this.tree);
                            }
                            namedChild(e) {
                                return marshalNode(this), C._ts_node_named_child_wasm(this.tree[0], e), unmarshalNode(this.tree);
                            }
                            childForFieldId(e) {
                                return marshalNode(this), C._ts_node_child_by_field_id_wasm(this.tree[0], e), unmarshalNode(this.tree);
                            }
                            childForFieldName(e) {
                                const r = this.tree.language.fields.indexOf(e);
                                return r !== -1 ? this.childForFieldId(r) : null;
                            }
                            fieldNameForChild(e) {
                                marshalNode(this);
                                const r = C._ts_node_field_name_for_child_wasm(this.tree[0], e);
                                return r ? AsciiToString(r) : null;
                            }
                            childrenForFieldName(e) {
                                const r = this.tree.language.fields.indexOf(e);
                                return r !== -1 && r !== 0 ? this.childrenForFieldId(r) : [];
                            }
                            childrenForFieldId(e) {
                                marshalNode(this), C._ts_node_children_by_field_id_wasm(this.tree[0], e);
                                const r = getValue(TRANSFER_BUFFER, "i32"), s = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"), n = new Array(r);
                                if (r > 0) {
                                    let o = s;
                                    for(let a = 0; a < r; a++)n[a] = unmarshalNode(this.tree, o), o += SIZE_OF_NODE;
                                    C._free(s);
                                }
                                return n;
                            }
                            firstChildForIndex(e) {
                                marshalNode(this);
                                const r = TRANSFER_BUFFER + SIZE_OF_NODE;
                                return setValue(r, e, "i32"), C._ts_node_first_child_for_byte_wasm(this.tree[0]), unmarshalNode(this.tree);
                            }
                            firstNamedChildForIndex(e) {
                                marshalNode(this);
                                const r = TRANSFER_BUFFER + SIZE_OF_NODE;
                                return setValue(r, e, "i32"), C._ts_node_first_named_child_for_byte_wasm(this.tree[0]), unmarshalNode(this.tree);
                            }
                            get childCount() {
                                return marshalNode(this), C._ts_node_child_count_wasm(this.tree[0]);
                            }
                            get namedChildCount() {
                                return marshalNode(this), C._ts_node_named_child_count_wasm(this.tree[0]);
                            }
                            get firstChild() {
                                return this.child(0);
                            }
                            get firstNamedChild() {
                                return this.namedChild(0);
                            }
                            get lastChild() {
                                return this.child(this.childCount - 1);
                            }
                            get lastNamedChild() {
                                return this.namedChild(this.namedChildCount - 1);
                            }
                            get children() {
                                if (!this._children) {
                                    marshalNode(this), C._ts_node_children_wasm(this.tree[0]);
                                    const e = getValue(TRANSFER_BUFFER, "i32"), r = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
                                    if (this._children = new Array(e), e > 0) {
                                        let s = r;
                                        for(let n = 0; n < e; n++)this._children[n] = unmarshalNode(this.tree, s), s += SIZE_OF_NODE;
                                        C._free(r);
                                    }
                                }
                                return this._children;
                            }
                            get namedChildren() {
                                if (!this._namedChildren) {
                                    marshalNode(this), C._ts_node_named_children_wasm(this.tree[0]);
                                    const e = getValue(TRANSFER_BUFFER, "i32"), r = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
                                    if (this._namedChildren = new Array(e), e > 0) {
                                        let s = r;
                                        for(let n = 0; n < e; n++)this._namedChildren[n] = unmarshalNode(this.tree, s), s += SIZE_OF_NODE;
                                        C._free(r);
                                    }
                                }
                                return this._namedChildren;
                            }
                            descendantsOfType(e, r, s) {
                                Array.isArray(e) || (e = [
                                    e
                                ]), r || (r = ZERO_POINT), s || (s = ZERO_POINT);
                                const n = [], o = this.tree.language.types;
                                for(let d = 0, c = o.length; d < c; d++)e.includes(o[d]) && n.push(d);
                                const a = C._malloc(SIZE_OF_INT * n.length);
                                for(let d = 0, c = n.length; d < c; d++)setValue(a + d * SIZE_OF_INT, n[d], "i32");
                                marshalNode(this), C._ts_node_descendants_of_type_wasm(this.tree[0], a, n.length, r.row, r.column, s.row, s.column);
                                const l = getValue(TRANSFER_BUFFER, "i32"), u = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"), p = new Array(l);
                                if (l > 0) {
                                    let d = u;
                                    for(let c = 0; c < l; c++)p[c] = unmarshalNode(this.tree, d), d += SIZE_OF_NODE;
                                }
                                return C._free(u), C._free(a), p;
                            }
                            get nextSibling() {
                                return marshalNode(this), C._ts_node_next_sibling_wasm(this.tree[0]), unmarshalNode(this.tree);
                            }
                            get previousSibling() {
                                return marshalNode(this), C._ts_node_prev_sibling_wasm(this.tree[0]), unmarshalNode(this.tree);
                            }
                            get nextNamedSibling() {
                                return marshalNode(this), C._ts_node_next_named_sibling_wasm(this.tree[0]), unmarshalNode(this.tree);
                            }
                            get previousNamedSibling() {
                                return marshalNode(this), C._ts_node_prev_named_sibling_wasm(this.tree[0]), unmarshalNode(this.tree);
                            }
                            get descendantCount() {
                                return marshalNode(this), C._ts_node_descendant_count_wasm(this.tree[0]);
                            }
                            get parent() {
                                return marshalNode(this), C._ts_node_parent_wasm(this.tree[0]), unmarshalNode(this.tree);
                            }
                            descendantForIndex(e, r = e) {
                                if (typeof e != "number" || typeof r != "number") throw new Error("Arguments must be numbers");
                                marshalNode(this);
                                const s = TRANSFER_BUFFER + SIZE_OF_NODE;
                                return setValue(s, e, "i32"), setValue(s + SIZE_OF_INT, r, "i32"), C._ts_node_descendant_for_index_wasm(this.tree[0]), unmarshalNode(this.tree);
                            }
                            namedDescendantForIndex(e, r = e) {
                                if (typeof e != "number" || typeof r != "number") throw new Error("Arguments must be numbers");
                                marshalNode(this);
                                const s = TRANSFER_BUFFER + SIZE_OF_NODE;
                                return setValue(s, e, "i32"), setValue(s + SIZE_OF_INT, r, "i32"), C._ts_node_named_descendant_for_index_wasm(this.tree[0]), unmarshalNode(this.tree);
                            }
                            descendantForPosition(e, r = e) {
                                if (!isPoint(e) || !isPoint(r)) throw new Error("Arguments must be {row, column} objects");
                                marshalNode(this);
                                const s = TRANSFER_BUFFER + SIZE_OF_NODE;
                                return marshalPoint(s, e), marshalPoint(s + SIZE_OF_POINT, r), C._ts_node_descendant_for_position_wasm(this.tree[0]), unmarshalNode(this.tree);
                            }
                            namedDescendantForPosition(e, r = e) {
                                if (!isPoint(e) || !isPoint(r)) throw new Error("Arguments must be {row, column} objects");
                                marshalNode(this);
                                const s = TRANSFER_BUFFER + SIZE_OF_NODE;
                                return marshalPoint(s, e), marshalPoint(s + SIZE_OF_POINT, r), C._ts_node_named_descendant_for_position_wasm(this.tree[0]), unmarshalNode(this.tree);
                            }
                            walk() {
                                return marshalNode(this), C._ts_tree_cursor_new_wasm(this.tree[0]), new TreeCursor(INTERNAL, this.tree);
                            }
                            toString() {
                                marshalNode(this);
                                const e = C._ts_node_to_string_wasm(this.tree[0]), r = AsciiToString(e);
                                return C._free(e), r;
                            }
                        }
                        class TreeCursor {
                            constructor(e, r){
                                assertInternal(e), this.tree = r, unmarshalTreeCursor(this);
                            }
                            delete() {
                                marshalTreeCursor(this), C._ts_tree_cursor_delete_wasm(this.tree[0]), this[0] = this[1] = this[2] = 0;
                            }
                            reset(e) {
                                marshalNode(e), marshalTreeCursor(this, TRANSFER_BUFFER + SIZE_OF_NODE), C._ts_tree_cursor_reset_wasm(this.tree[0]), unmarshalTreeCursor(this);
                            }
                            resetTo(e) {
                                marshalTreeCursor(this, TRANSFER_BUFFER), marshalTreeCursor(e, TRANSFER_BUFFER + SIZE_OF_CURSOR), C._ts_tree_cursor_reset_to_wasm(this.tree[0], e.tree[0]), unmarshalTreeCursor(this);
                            }
                            get nodeType() {
                                return this.tree.language.types[this.nodeTypeId] || "ERROR";
                            }
                            get nodeTypeId() {
                                return marshalTreeCursor(this), C._ts_tree_cursor_current_node_type_id_wasm(this.tree[0]);
                            }
                            get nodeStateId() {
                                return marshalTreeCursor(this), C._ts_tree_cursor_current_node_state_id_wasm(this.tree[0]);
                            }
                            get nodeId() {
                                return marshalTreeCursor(this), C._ts_tree_cursor_current_node_id_wasm(this.tree[0]);
                            }
                            get nodeIsNamed() {
                                return marshalTreeCursor(this), C._ts_tree_cursor_current_node_is_named_wasm(this.tree[0]) === 1;
                            }
                            get nodeIsMissing() {
                                return marshalTreeCursor(this), C._ts_tree_cursor_current_node_is_missing_wasm(this.tree[0]) === 1;
                            }
                            get nodeText() {
                                marshalTreeCursor(this);
                                const e = C._ts_tree_cursor_start_index_wasm(this.tree[0]), r = C._ts_tree_cursor_end_index_wasm(this.tree[0]);
                                return getText(this.tree, e, r);
                            }
                            get startPosition() {
                                return marshalTreeCursor(this), C._ts_tree_cursor_start_position_wasm(this.tree[0]), unmarshalPoint(TRANSFER_BUFFER);
                            }
                            get endPosition() {
                                return marshalTreeCursor(this), C._ts_tree_cursor_end_position_wasm(this.tree[0]), unmarshalPoint(TRANSFER_BUFFER);
                            }
                            get startIndex() {
                                return marshalTreeCursor(this), C._ts_tree_cursor_start_index_wasm(this.tree[0]);
                            }
                            get endIndex() {
                                return marshalTreeCursor(this), C._ts_tree_cursor_end_index_wasm(this.tree[0]);
                            }
                            get currentNode() {
                                return marshalTreeCursor(this), C._ts_tree_cursor_current_node_wasm(this.tree[0]), unmarshalNode(this.tree);
                            }
                            get currentFieldId() {
                                return marshalTreeCursor(this), C._ts_tree_cursor_current_field_id_wasm(this.tree[0]);
                            }
                            get currentFieldName() {
                                return this.tree.language.fields[this.currentFieldId];
                            }
                            get currentDepth() {
                                return marshalTreeCursor(this), C._ts_tree_cursor_current_depth_wasm(this.tree[0]);
                            }
                            get currentDescendantIndex() {
                                return marshalTreeCursor(this), C._ts_tree_cursor_current_descendant_index_wasm(this.tree[0]);
                            }
                            gotoFirstChild() {
                                marshalTreeCursor(this);
                                const e = C._ts_tree_cursor_goto_first_child_wasm(this.tree[0]);
                                return unmarshalTreeCursor(this), e === 1;
                            }
                            gotoLastChild() {
                                marshalTreeCursor(this);
                                const e = C._ts_tree_cursor_goto_last_child_wasm(this.tree[0]);
                                return unmarshalTreeCursor(this), e === 1;
                            }
                            gotoFirstChildForIndex(e) {
                                marshalTreeCursor(this), setValue(TRANSFER_BUFFER + SIZE_OF_CURSOR, e, "i32");
                                const r = C._ts_tree_cursor_goto_first_child_for_index_wasm(this.tree[0]);
                                return unmarshalTreeCursor(this), r === 1;
                            }
                            gotoFirstChildForPosition(e) {
                                marshalTreeCursor(this), marshalPoint(TRANSFER_BUFFER + SIZE_OF_CURSOR, e);
                                const r = C._ts_tree_cursor_goto_first_child_for_position_wasm(this.tree[0]);
                                return unmarshalTreeCursor(this), r === 1;
                            }
                            gotoNextSibling() {
                                marshalTreeCursor(this);
                                const e = C._ts_tree_cursor_goto_next_sibling_wasm(this.tree[0]);
                                return unmarshalTreeCursor(this), e === 1;
                            }
                            gotoPreviousSibling() {
                                marshalTreeCursor(this);
                                const e = C._ts_tree_cursor_goto_previous_sibling_wasm(this.tree[0]);
                                return unmarshalTreeCursor(this), e === 1;
                            }
                            gotoDescendant(e) {
                                marshalTreeCursor(this), C._ts_tree_cursor_goto_descendant_wasm(this.tree[0], e), unmarshalTreeCursor(this);
                            }
                            gotoParent() {
                                marshalTreeCursor(this);
                                const e = C._ts_tree_cursor_goto_parent_wasm(this.tree[0]);
                                return unmarshalTreeCursor(this), e === 1;
                            }
                        }
                        class Language {
                            constructor(e, r){
                                assertInternal(e), this[0] = r, this.types = new Array(C._ts_language_symbol_count(this[0]));
                                for(let s = 0, n = this.types.length; s < n; s++)C._ts_language_symbol_type(this[0], s) < 2 && (this.types[s] = UTF8ToString(C._ts_language_symbol_name(this[0], s)));
                                this.fields = new Array(C._ts_language_field_count(this[0]) + 1);
                                for(let s = 0, n = this.fields.length; s < n; s++){
                                    const o = C._ts_language_field_name_for_id(this[0], s);
                                    o !== 0 ? this.fields[s] = UTF8ToString(o) : this.fields[s] = null;
                                }
                            }
                            get version() {
                                return C._ts_language_version(this[0]);
                            }
                            get fieldCount() {
                                return this.fields.length - 1;
                            }
                            get stateCount() {
                                return C._ts_language_state_count(this[0]);
                            }
                            fieldIdForName(e) {
                                const r = this.fields.indexOf(e);
                                return r !== -1 ? r : null;
                            }
                            fieldNameForId(e) {
                                return this.fields[e] || null;
                            }
                            idForNodeType(e, r) {
                                const s = lengthBytesUTF8(e), n = C._malloc(s + 1);
                                stringToUTF8(e, n, s + 1);
                                const o = C._ts_language_symbol_for_name(this[0], n, s, r);
                                return C._free(n), o || null;
                            }
                            get nodeTypeCount() {
                                return C._ts_language_symbol_count(this[0]);
                            }
                            nodeTypeForId(e) {
                                const r = C._ts_language_symbol_name(this[0], e);
                                return r ? UTF8ToString(r) : null;
                            }
                            nodeTypeIsNamed(e) {
                                return !!C._ts_language_type_is_named_wasm(this[0], e);
                            }
                            nodeTypeIsVisible(e) {
                                return !!C._ts_language_type_is_visible_wasm(this[0], e);
                            }
                            nextState(e, r) {
                                return C._ts_language_next_state(this[0], e, r);
                            }
                            lookaheadIterator(e) {
                                const r = C._ts_lookahead_iterator_new(this[0], e);
                                return r ? new LookaheadIterable(INTERNAL, r, this) : null;
                            }
                            query(e) {
                                const r = lengthBytesUTF8(e), s = C._malloc(r + 1);
                                stringToUTF8(e, s, r + 1);
                                const n = C._ts_query_new(this[0], s, r, TRANSFER_BUFFER, TRANSFER_BUFFER + SIZE_OF_INT);
                                if (!n) {
                                    const y = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"), T = getValue(TRANSFER_BUFFER, "i32"), E = UTF8ToString(s, T).length, f = e.substr(E, 100).split(`
`)[0];
                                    let _ = f.match(QUERY_WORD_REGEX)[0], x;
                                    switch(y){
                                        case 2:
                                            x = new RangeError(`Bad node name '${_}'`);
                                            break;
                                        case 3:
                                            x = new RangeError(`Bad field name '${_}'`);
                                            break;
                                        case 4:
                                            x = new RangeError(`Bad capture name @${_}`);
                                            break;
                                        case 5:
                                            x = new TypeError(`Bad pattern structure at offset ${E}: '${f}'...`), _ = "";
                                            break;
                                        default:
                                            x = new SyntaxError(`Bad syntax at offset ${E}: '${f}'...`), _ = "";
                                            break;
                                    }
                                    throw x.index = E, x.length = _.length, C._free(s), x;
                                }
                                const o = C._ts_query_string_count(n), a = C._ts_query_capture_count(n), l = C._ts_query_pattern_count(n), u = new Array(a), p = new Array(o);
                                for(let y = 0; y < a; y++){
                                    const T = C._ts_query_capture_name_for_id(n, y, TRANSFER_BUFFER), E = getValue(TRANSFER_BUFFER, "i32");
                                    u[y] = UTF8ToString(T, E);
                                }
                                for(let y = 0; y < o; y++){
                                    const T = C._ts_query_string_value_for_id(n, y, TRANSFER_BUFFER), E = getValue(TRANSFER_BUFFER, "i32");
                                    p[y] = UTF8ToString(T, E);
                                }
                                const d = new Array(l), c = new Array(l), m = new Array(l), h = new Array(l), w = new Array(l);
                                for(let y = 0; y < l; y++){
                                    const T = C._ts_query_predicates_for_pattern(n, y, TRANSFER_BUFFER), E = getValue(TRANSFER_BUFFER, "i32");
                                    h[y] = [], w[y] = [];
                                    const f = [];
                                    let _ = T;
                                    for(let x = 0; x < E; x++){
                                        const A = getValue(_, "i32");
                                        _ += SIZE_OF_INT;
                                        const g = getValue(_, "i32");
                                        if (_ += SIZE_OF_INT, A === PREDICATE_STEP_TYPE_CAPTURE) f.push({
                                            type: "capture",
                                            name: u[g]
                                        });
                                        else if (A === PREDICATE_STEP_TYPE_STRING) f.push({
                                            type: "string",
                                            value: p[g]
                                        });
                                        else if (f.length > 0) {
                                            if (f[0].type !== "string") throw new Error("Predicates must begin with a literal value");
                                            const b = f[0].value;
                                            let v = !0, F = !0, I;
                                            switch(b){
                                                case "any-not-eq?":
                                                case "not-eq?":
                                                    v = !1;
                                                case "any-eq?":
                                                case "eq?":
                                                    if (f.length !== 3) throw new Error(`Wrong number of arguments to \`#${b}\` predicate. Expected 2, got ${f.length - 1}`);
                                                    if (f[1].type !== "capture") throw new Error(`First argument of \`#${b}\` predicate must be a capture. Got "${f[1].value}"`);
                                                    if (F = !b.startsWith("any-"), f[2].type === "capture") {
                                                        const S = f[1].name, P = f[2].name;
                                                        w[y].push((N)=>{
                                                            const M = [], D = [];
                                                            for (const k of N)k.name === S && M.push(k.node), k.name === P && D.push(k.node);
                                                            const $ = (k, L, j)=>j ? k.text === L.text : k.text !== L.text;
                                                            return F ? M.every((k)=>D.some((L)=>$(k, L, v))) : M.some((k)=>D.some((L)=>$(k, L, v)));
                                                        });
                                                    } else {
                                                        I = f[1].name;
                                                        const S = f[2].value, P = (M)=>M.text === S, N = (M)=>M.text !== S;
                                                        w[y].push((M)=>{
                                                            const D = [];
                                                            for (const k of M)k.name === I && D.push(k.node);
                                                            const $ = v ? P : N;
                                                            return F ? D.every($) : D.some($);
                                                        });
                                                    }
                                                    break;
                                                case "any-not-match?":
                                                case "not-match?":
                                                    v = !1;
                                                case "any-match?":
                                                case "match?":
                                                    if (f.length !== 3) throw new Error(`Wrong number of arguments to \`#${b}\` predicate. Expected 2, got ${f.length - 1}.`);
                                                    if (f[1].type !== "capture") throw new Error(`First argument of \`#${b}\` predicate must be a capture. Got "${f[1].value}".`);
                                                    if (f[2].type !== "string") throw new Error(`Second argument of \`#${b}\` predicate must be a string. Got @${f[2].value}.`);
                                                    I = f[1].name;
                                                    const U = new RegExp(f[2].value);
                                                    F = !b.startsWith("any-"), w[y].push((S)=>{
                                                        const P = [];
                                                        for (const M of S)M.name === I && P.push(M.node.text);
                                                        const N = (M, D)=>D ? U.test(M) : !U.test(M);
                                                        return P.length === 0 ? !v : F ? P.every((M)=>N(M, v)) : P.some((M)=>N(M, v));
                                                    });
                                                    break;
                                                case "set!":
                                                    if (f.length < 2 || f.length > 3) throw new Error(`Wrong number of arguments to \`#set!\` predicate. Expected 1 or 2. Got ${f.length - 1}.`);
                                                    if (f.some((S)=>S.type !== "string")) throw new Error('Arguments to `#set!` predicate must be a strings.".');
                                                    d[y] || (d[y] = {}), d[y][f[1].value] = f[2] ? f[2].value : null;
                                                    break;
                                                case "is?":
                                                case "is-not?":
                                                    if (f.length < 2 || f.length > 3) throw new Error(`Wrong number of arguments to \`#${b}\` predicate. Expected 1 or 2. Got ${f.length - 1}.`);
                                                    if (f.some((S)=>S.type !== "string")) throw new Error(`Arguments to \`#${b}\` predicate must be a strings.".`);
                                                    const O = b === "is?" ? c : m;
                                                    O[y] || (O[y] = {}), O[y][f[1].value] = f[2] ? f[2].value : null;
                                                    break;
                                                case "not-any-of?":
                                                    v = !1;
                                                case "any-of?":
                                                    if (f.length < 2) throw new Error(`Wrong number of arguments to \`#${b}\` predicate. Expected at least 1. Got ${f.length - 1}.`);
                                                    if (f[1].type !== "capture") throw new Error(`First argument of \`#${b}\` predicate must be a capture. Got "${f[1].value}".`);
                                                    for(let S = 2; S < f.length; S++)if (f[S].type !== "string") throw new Error(`Arguments to \`#${b}\` predicate must be a strings.".`);
                                                    I = f[1].name;
                                                    const B = f.slice(2).map((S)=>S.value);
                                                    w[y].push((S)=>{
                                                        const P = [];
                                                        for (const N of S)N.name === I && P.push(N.node.text);
                                                        return P.length === 0 ? !v : P.every((N)=>B.includes(N)) === v;
                                                    });
                                                    break;
                                                default:
                                                    h[y].push({
                                                        operator: b,
                                                        operands: f.slice(1)
                                                    });
                                            }
                                            f.length = 0;
                                        }
                                    }
                                    Object.freeze(d[y]), Object.freeze(c[y]), Object.freeze(m[y]);
                                }
                                return C._free(s), new Query(INTERNAL, n, u, w, h, Object.freeze(d), Object.freeze(c), Object.freeze(m));
                            }
                            static load(e) {
                                let r;
                                if (e instanceof Uint8Array) r = Promise.resolve(e);
                                else {
                                    const s = e;
                                    if (typeof process < "u" && process.versions && process.versions.node) {
                                        const n = empty_1;
                                        r = Promise.resolve(n.readFileSync(s));
                                    } else r = fetch(s).then((n)=>n.arrayBuffer().then((o)=>{
                                            if (n.ok) return new Uint8Array(o);
                                            {
                                                const a = new TextDecoder("utf-8").decode(o);
                                                throw new Error(`Language.load failed with status ${n.status}.

${a}`);
                                            }
                                        }));
                                }
                                return r.then((s)=>loadWebAssemblyModule(s, {
                                        loadAsync: !0
                                    })).then((s)=>{
                                    const n = Object.keys(s), o = n.find((l)=>LANGUAGE_FUNCTION_REGEX.test(l) && !l.includes("external_scanner_"));
                                    o || console.log(`Couldn't find language function in WASM file. Symbols:
${JSON.stringify(n, null, 2)}`);
                                    const a = s[o]();
                                    return new Language(INTERNAL, a);
                                });
                            }
                        }
                        class LookaheadIterable {
                            constructor(e, r, s){
                                assertInternal(e), this[0] = r, this.language = s;
                            }
                            get currentTypeId() {
                                return C._ts_lookahead_iterator_current_symbol(this[0]);
                            }
                            get currentType() {
                                return this.language.types[this.currentTypeId] || "ERROR";
                            }
                            delete() {
                                C._ts_lookahead_iterator_delete(this[0]), this[0] = 0;
                            }
                            resetState(e) {
                                return C._ts_lookahead_iterator_reset_state(this[0], e);
                            }
                            reset(e, r) {
                                return C._ts_lookahead_iterator_reset(this[0], e[0], r) ? (this.language = e, !0) : !1;
                            }
                            [Symbol.iterator]() {
                                const e = this;
                                return {
                                    next () {
                                        return C._ts_lookahead_iterator_next(e[0]) ? {
                                            done: !1,
                                            value: e.currentType
                                        } : {
                                            done: !0,
                                            value: ""
                                        };
                                    }
                                };
                            }
                        }
                        class Query {
                            constructor(e, r, s, n, o, a, l, u){
                                assertInternal(e), this[0] = r, this.captureNames = s, this.textPredicates = n, this.predicates = o, this.setProperties = a, this.assertedProperties = l, this.refutedProperties = u, this.exceededMatchLimit = !1;
                            }
                            delete() {
                                C._ts_query_delete(this[0]), this[0] = 0;
                            }
                            matches(e, { startPosition: r = ZERO_POINT, endPosition: s = ZERO_POINT, startIndex: n = 0, endIndex: o = 0, matchLimit: a = 4294967295, maxStartDepth: l = 4294967295, timeoutMicros: u = 0 } = {}) {
                                if (typeof a != "number") throw new Error("Arguments must be numbers");
                                marshalNode(e), C._ts_query_matches_wasm(this[0], e.tree[0], r.row, r.column, s.row, s.column, n, o, a, l, u);
                                const p = getValue(TRANSFER_BUFFER, "i32"), d = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"), c = getValue(TRANSFER_BUFFER + 2 * SIZE_OF_INT, "i32"), m = new Array(p);
                                this.exceededMatchLimit = !!c;
                                let h = 0, w = d;
                                for(let y = 0; y < p; y++){
                                    const T = getValue(w, "i32");
                                    w += SIZE_OF_INT;
                                    const E = getValue(w, "i32");
                                    w += SIZE_OF_INT;
                                    const f = new Array(E);
                                    if (w = unmarshalCaptures(this, e.tree, w, f), this.textPredicates[T].every((_)=>_(f))) {
                                        m[h] = {
                                            pattern: T,
                                            captures: f
                                        };
                                        const _ = this.setProperties[T];
                                        _ && (m[h].setProperties = _);
                                        const x = this.assertedProperties[T];
                                        x && (m[h].assertedProperties = x);
                                        const A = this.refutedProperties[T];
                                        A && (m[h].refutedProperties = A), h++;
                                    }
                                }
                                return m.length = h, C._free(d), m;
                            }
                            captures(e, { startPosition: r = ZERO_POINT, endPosition: s = ZERO_POINT, startIndex: n = 0, endIndex: o = 0, matchLimit: a = 4294967295, maxStartDepth: l = 4294967295, timeoutMicros: u = 0 } = {}) {
                                if (typeof a != "number") throw new Error("Arguments must be numbers");
                                marshalNode(e), C._ts_query_captures_wasm(this[0], e.tree[0], r.row, r.column, s.row, s.column, n, o, a, l, u);
                                const p = getValue(TRANSFER_BUFFER, "i32"), d = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"), c = getValue(TRANSFER_BUFFER + 2 * SIZE_OF_INT, "i32"), m = [];
                                this.exceededMatchLimit = !!c;
                                const h = [];
                                let w = d;
                                for(let y = 0; y < p; y++){
                                    const T = getValue(w, "i32");
                                    w += SIZE_OF_INT;
                                    const E = getValue(w, "i32");
                                    w += SIZE_OF_INT;
                                    const f = getValue(w, "i32");
                                    if (w += SIZE_OF_INT, h.length = E, w = unmarshalCaptures(this, e.tree, w, h), this.textPredicates[T].every((_)=>_(h))) {
                                        const _ = h[f], x = this.setProperties[T];
                                        x && (_.setProperties = x);
                                        const A = this.assertedProperties[T];
                                        A && (_.assertedProperties = A);
                                        const g = this.refutedProperties[T];
                                        g && (_.refutedProperties = g), m.push(_);
                                    }
                                }
                                return C._free(d), m;
                            }
                            predicatesForPattern(e) {
                                return this.predicates[e];
                            }
                            disableCapture(e) {
                                const r = lengthBytesUTF8(e), s = C._malloc(r + 1);
                                stringToUTF8(e, s, r + 1), C._ts_query_disable_capture(this[0], s, r), C._free(s);
                            }
                            didExceedMatchLimit() {
                                return this.exceededMatchLimit;
                            }
                        }
                        function getText(t, e, r) {
                            const s = r - e;
                            let n = t.textCallback(e, null, r);
                            for(e += n.length; e < r;){
                                const o = t.textCallback(e, null, r);
                                if (o && o.length > 0) e += o.length, n += o;
                                else break;
                            }
                            return e > r && (n = n.slice(0, s)), n;
                        }
                        function unmarshalCaptures(t, e, r, s) {
                            for(let n = 0, o = s.length; n < o; n++){
                                const a = getValue(r, "i32");
                                r += SIZE_OF_INT;
                                const l = unmarshalNode(e, r);
                                r += SIZE_OF_NODE, s[n] = {
                                    name: t.captureNames[a],
                                    node: l
                                };
                            }
                            return r;
                        }
                        function assertInternal(t) {
                            if (t !== INTERNAL) throw new Error("Illegal constructor");
                        }
                        function isPoint(t) {
                            return t && typeof t.row == "number" && typeof t.column == "number";
                        }
                        function marshalNode(t) {
                            let e = TRANSFER_BUFFER;
                            setValue(e, t.id, "i32"), e += SIZE_OF_INT, setValue(e, t.startIndex, "i32"), e += SIZE_OF_INT, setValue(e, t.startPosition.row, "i32"), e += SIZE_OF_INT, setValue(e, t.startPosition.column, "i32"), e += SIZE_OF_INT, setValue(e, t[0], "i32");
                        }
                        function unmarshalNode(t, e = TRANSFER_BUFFER) {
                            const r = getValue(e, "i32");
                            if (e += SIZE_OF_INT, r === 0) return null;
                            const s = getValue(e, "i32");
                            e += SIZE_OF_INT;
                            const n = getValue(e, "i32");
                            e += SIZE_OF_INT;
                            const o = getValue(e, "i32");
                            e += SIZE_OF_INT;
                            const a = getValue(e, "i32"), l = new Node(INTERNAL, t);
                            return l.id = r, l.startIndex = s, l.startPosition = {
                                row: n,
                                column: o
                            }, l[0] = a, l;
                        }
                        function marshalTreeCursor(t, e = TRANSFER_BUFFER) {
                            setValue(e + 0 * SIZE_OF_INT, t[0], "i32"), setValue(e + 1 * SIZE_OF_INT, t[1], "i32"), setValue(e + 2 * SIZE_OF_INT, t[2], "i32"), setValue(e + 3 * SIZE_OF_INT, t[3], "i32");
                        }
                        function unmarshalTreeCursor(t) {
                            t[0] = getValue(TRANSFER_BUFFER + 0 * SIZE_OF_INT, "i32"), t[1] = getValue(TRANSFER_BUFFER + 1 * SIZE_OF_INT, "i32"), t[2] = getValue(TRANSFER_BUFFER + 2 * SIZE_OF_INT, "i32"), t[3] = getValue(TRANSFER_BUFFER + 3 * SIZE_OF_INT, "i32");
                        }
                        function marshalPoint(t, e) {
                            setValue(t, e.row, "i32"), setValue(t + SIZE_OF_INT, e.column, "i32");
                        }
                        function unmarshalPoint(t) {
                            return {
                                row: getValue(t, "i32") >>> 0,
                                column: getValue(t + SIZE_OF_INT, "i32") >>> 0
                            };
                        }
                        function marshalRange(t, e) {
                            marshalPoint(t, e.startPosition), t += SIZE_OF_POINT, marshalPoint(t, e.endPosition), t += SIZE_OF_POINT, setValue(t, e.startIndex, "i32"), t += SIZE_OF_INT, setValue(t, e.endIndex, "i32"), t += SIZE_OF_INT;
                        }
                        function unmarshalRange(t) {
                            const e = {};
                            return e.startPosition = unmarshalPoint(t), t += SIZE_OF_POINT, e.endPosition = unmarshalPoint(t), t += SIZE_OF_POINT, e.startIndex = getValue(t, "i32") >>> 0, t += SIZE_OF_INT, e.endIndex = getValue(t, "i32") >>> 0, e;
                        }
                        function marshalEdit(t) {
                            let e = TRANSFER_BUFFER;
                            marshalPoint(e, t.startPosition), e += SIZE_OF_POINT, marshalPoint(e, t.oldEndPosition), e += SIZE_OF_POINT, marshalPoint(e, t.newEndPosition), e += SIZE_OF_POINT, setValue(e, t.startIndex, "i32"), e += SIZE_OF_INT, setValue(e, t.oldEndIndex, "i32"), e += SIZE_OF_INT, setValue(e, t.newEndIndex, "i32"), e += SIZE_OF_INT;
                        }
                        for (const t of Object.getOwnPropertyNames(ParserImpl.prototype))Object.defineProperty(Parser.prototype, t, {
                            value: ParserImpl.prototype[t],
                            enumerable: !1,
                            writable: !1
                        });
                        Parser.Language = Language, Module.onRuntimeInitialized = ()=>{
                            ParserImpl.init(), resolveInitPromise();
                        };
                    }));
                }
            }
            return Parser;
        }();
        module.exports = TreeSitter;
    })(treeSitter);
    var treeSitterExports = treeSitter.exports;
    const Parser$2 = getDefaultExportFromCjs(treeSitterExports);
    await Parser$2.init({
        locateFile (t, e) {
            return "/" + t;
        }
    });
    const Bash = await Parser$2.Language.load("/tree-sitter-bash.wasm"), parser = new Parser$2;
    parser.setLanguage(Bash);
    function warnf(t, e) {
        t.warnings.push(e);
    }
    function underline(t, e, r, s) {
        e === r && r++;
        let n = e;
        e > 0 && (n = s.lastIndexOf(`
`, e - 1) + 1);
        let o = r - e, a = s.indexOf(`
`, e);
        a === -1 ? a = s.length : a < r && (o = a - e + 1);
        const l = s.slice(n, a), u = " ".repeat(e - n) + "^".repeat(o);
        return l + `
` + u;
    }
    function underlineCursor(t, e) {
        return underline(t, t.startIndex, t.endIndex, e);
    }
    function underlineNode(t, e) {
        const r = t.tree.rootNode;
        let s = t.startIndex, n = t.endIndex;
        return e || (e = r.text, s -= r.startIndex, n -= r.startIndex), underline(t, s, n, e);
    }
    function warnIfPartsIgnored(t, e, r) {
        t.urls.length > 1 && !r?.multipleUrls && e.push([
            "multiple-urls",
            "found " + t.urls.length + " URLs, only the first one will be used: " + t.urls.map((s)=>JSON.stringify(s.originalUrl.toString())).join(", ")
        ]), t.dataReadsFile && !r?.dataReadsFile && e.push([
            "unsafe-data",
            "the generated data content is wrong, " + JSON.stringify("@" + t.dataReadsFile) + " means read the file " + JSON.stringify(t.dataReadsFile)
        ]), t.urls[0].queryReadsFile && !r?.queryReadsFile && e.push([
            "unsafe-query",
            "the generated URL query string is wrong, " + JSON.stringify("@" + t.urls[0].queryReadsFile) + " means read the file " + JSON.stringify(t.urls[0].queryReadsFile)
        ]), t.cookieFiles && !r?.cookieFiles && e.push([
            "cookie-files",
            "passing a file for --cookie/-b is not supported: " + t.cookieFiles.map((s)=>JSON.stringify(s.toString())).join(", ")
        ]);
    }
    const BACKSLASHES = /\\./gs;
    function removeBackslash(t) {
        return t.charAt(1) === `
` ? "" : t.charAt(1);
    }
    function removeBackslashes(t) {
        return t.replace(BACKSLASHES, removeBackslash);
    }
    const DOUBLE_QUOTE_BACKSLASHES = /\\[\\$`"\n]/gs;
    function removeDoubleQuoteBackslashes(t) {
        return t.replace(DOUBLE_QUOTE_BACKSLASHES, removeBackslash);
    }
    const ANSI_BACKSLASHES = /\\(\\|a|b|e|E|f|n|r|t|v|'|"|\?|[0-7]{1,3}|x[0-9A-Fa-f]{1,2}|u[0-9A-Fa-f]{1,4}|U[0-9A-Fa-f]{1,8}|c.)/gs;
    function removeAnsiCBackslashes(t) {
        function e(r) {
            switch(r.charAt(1)){
                case "\\":
                    return "\\";
                case "a":
                    return "\x07";
                case "b":
                    return "\b";
                case "e":
                case "E":
                    return "\x1B";
                case "f":
                    return "\f";
                case "n":
                    return `
`;
                case "r":
                    return "\r";
                case "t":
                    return "	";
                case "v":
                    return "\v";
                case "'":
                    return "'";
                case '"':
                    return '"';
                case "?":
                    return "?";
                case "c":
                    if (r.codePointAt(2) > 127) throw new CCError('non-ASCII control character in ANSI-C quoted string: "\\u{' + r.codePointAt(2).toString(16) + '}"');
                    return r[2] === "?" ? "" : String.fromCodePoint(r[2].toUpperCase().codePointAt(0) & 31);
                case "x":
                case "u":
                case "U":
                    return String.fromCodePoint(parseInt(r.slice(2), 16));
                case "0":
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                    return String.fromCodePoint(parseInt(r.slice(1), 8) % 256);
                default:
                    throw new CCError("unhandled character in ANSI-C escape code: " + JSON.stringify(r));
            }
        }
        return t.replace(ANSI_BACKSLASHES, e);
    }
    function toTokens(t, e, r) {
        let s = [];
        switch(t.type){
            case "$":
                return [
                    "$"
                ];
            case "word":
            case "number":
                return [
                    removeBackslashes(t.text)
                ];
            case "raw_string":
                return [
                    t.text.slice(1, -1)
                ];
            case "ansi_c_string":
                return [
                    removeAnsiCBackslashes(t.text.slice(2, -1))
                ];
            case "string":
            case "translated_string":
                {
                    let n = "";
                    for (const o of t.namedChildren)if (o.type === "string_content") n += removeDoubleQuoteBackslashes(o.text);
                    else {
                        const a = toTokens(o, e, r);
                        typeof a == "string" ? n += a : (n && (s.push(n), n = ""), s = s.concat(a));
                    }
                    return (n || s.length === 0) && s.push(n), s;
                }
            case "simple_expansion":
                return r.push([
                    "expansion",
                    `found environment variable
` + underlineNode(t, e)
                ]), t.firstNamedChild && t.firstNamedChild.type === "special_variable_name" && r.push([
                    "special_variable_name",
                    t.text + ` is a special Bash variable
` + underlineNode(t.firstNamedChild, e)
                ]), [
                    {
                        type: "variable",
                        value: t.text.slice(1),
                        text: t.text,
                        syntaxNode: t
                    }
                ];
            case "expansion":
                return r.push([
                    "expansion",
                    `found expansion expression
` + underlineNode(t, e)
                ]), [
                    {
                        type: "variable",
                        value: t.text.slice(2, -1),
                        text: t.text,
                        syntaxNode: t
                    }
                ];
            case "command_substitution":
                return r.push([
                    "expansion",
                    `found command substitution expression
` + underlineNode(t, e)
                ]), [
                    {
                        type: "command",
                        value: t.text.slice(t.text.startsWith("$(") ? 2 : 1, -1),
                        text: t.text,
                        syntaxNode: t
                    }
                ];
            case "concatenation":
                {
                    let n = 0, o = "";
                    for (const a of t.children){
                        o += t.text.slice(n, a.startIndex - t.startIndex), n = a.endIndex - t.startIndex;
                        const l = toTokens(a, e, r);
                        typeof l == "string" ? o += l : (o && (s.push(o), o = ""), s = s.concat(l));
                    }
                    return o += t.text.slice(n), (o || s.length === 0) && s.push(o), s;
                }
            default:
                throw new CCError("unexpected syntax node type " + JSON.stringify(t.type) + `. Must be one of "word", "number", "string", "raw_string", "ansi_c_string", "expansion", "simple_expansion", "translated_string", "command_substitution" or "concatenation"
` + underlineNode(t, e));
        }
    }
    function toWord(t, e, r) {
        return new Word(toTokens(t, e, r));
    }
    function* traverseLookingForBadNodes(t) {
        const e = t.walk();
        let r = !1;
        for(; !r;){
            if ((e.nodeType === "ERROR" || e.nodeIsMissing) && (yield e), e.gotoFirstChild() || e.gotoNextSibling()) continue;
            let s = !0;
            for(; s;)e.gotoParent() || (s = !1, r = !0), e.gotoNextSibling() && (s = !1);
        }
    }
    function warnAboutBadNodes(t, e, r) {
        let n = 0;
        for (const a of traverseLookingForBadNodes(t)){
            if (n < 3) {
                let l = "";
                try {
                    l = `:
` + underlineCursor(a, e);
                } catch  {}
                const u = a.startPosition.row, p = a.startPosition.column;
                r.push([
                    "bash",
                    `Bash parsing error on line ${u + 1}` + (p !== 0 ? `, column ${p + 1}` : "") + l
                ]);
            }
            n += 1;
        }
        const o = n - 3;
        o > 0 && r.push([
            "bash",
            `${o} more Bash parsing error${o > 1 ? "s" : ""} omitted`
        ]);
    }
    function warnAboutUselessBackslash(t, e, r) {
        const s = e[t.endPosition.row], n = s.match(/\\\s+$/);
        n && e.length > t.endPosition.row + 1 && n.index !== void 0 && r.push([
            "unescaped-newline",
            "The trailling '\\' on line " + (t.endPosition.row + 1) + ` is followed by whitespace, so it won't escape the newline after it:
` + s + `
` + " ".repeat(n.index) + "^".repeat(n[0].length)
        ]);
    }
    function extractRedirect(t, e, r) {
        if (!t.namedChildCount) throw new CCError('got empty "redirected_statement" AST node');
        let s, n;
        const [o, ...a] = t.namedChildren;
        if (o.type !== "command") throw new CCError('got "redirected_statement" AST node whose first child is not a "command", got ' + o.type + ` instead
` + underlineNode(o, e));
        if (t.childCount < 2) throw new CCError('got "redirected_statement" AST node with only one child - no redirect');
        a.length > 1 && r.push([
            "multiple-redirects",
            "found " + a.length + ` redirect nodes. Only the first one will be used:
` + underlineNode(a[1], e)
        ]);
        const l = a[0];
        if (l.type === "file_redirect") {
            const u = l.childForFieldName("destination");
            if (!u) throw new CCError('got "file_redirect" AST node with no "destination" child');
            n = toWord(u, e, r);
        } else if (l.type === "heredoc_redirect") {
            const u = l.descendantsOfType("heredoc_body")[0];
            if (!u) throw new CCError('got "redirected_statement" AST node without heredoc_body');
            s = new Word(u.text);
        } else if (l.type === "herestring_redirect") {
            if (l.namedChildCount < 1 || !l.firstNamedChild) throw new CCError('got "redirected_statement" AST node with empty herestring');
            s = toWord(l.firstNamedChild, e, r);
        } else throw new CCError('got "redirected_statement" AST node whose second child is not one of "file_redirect", "heredoc_redirect" or "herestring_redirect", got ' + o.type + " instead");
        return [
            o,
            s,
            n
        ];
    }
    function _findCurlInPipeline(t, e, r) {
        let s, n, o;
        for (const a of t.namedChildren)if (a.type === "command") {
            const l = a.namedChildren[0];
            if (l.type !== "command_name") throw new CCError('got "command" AST node whose first child is not a "command_name", got ' + l.type + ` instead
` + underlineNode(l, e));
            const u = l.namedChildren[0];
            if (u.type !== "word") throw new CCError('got "command_name" AST node whose first child is not a "word", got ' + u.type + ` instead
` + underlineNode(u, e));
            u.text === "curl" && (s ? r.push([
                "multiple-curl-in-pipeline",
                `found multiple curl commands in pipeline:
` + underlineNode(a, e)
            ]) : s = a);
        } else if (a.type === "redirected_statement") {
            const [l, u, p] = extractRedirect(a, e, r);
            l.namedChildren[0].text === "curl" && (s ? r.push([
                "multiple-curl-in-pipeline",
                `found multiple curl commands in pipeline:
` + underlineNode(l, e)
            ]) : [s, n, o] = [
                l,
                u,
                p
            ]);
        } else if (a.type === "pipeline") {
            const [l, u, p] = _findCurlInPipeline(a, e, r);
            if (!l) continue;
            l.namedChildren[0].text === "curl" && (s ? r.push([
                "multiple-curl-in-pipeline",
                `found multiple curl commands in pipeline:
` + underlineNode(l, e)
            ]) : [s, n, o] = [
                l,
                u,
                p
            ]);
        }
        return [
            s,
            n,
            o
        ];
    }
    function findCurlInPipeline(t, e, r) {
        const [s, n, o] = _findCurlInPipeline(t, e, r);
        if (!s) throw new CCError(`could not find curl command in pipeline
` + underlineNode(t, e));
        return [
            s,
            n,
            o
        ];
    }
    function extractCommandNodes(t, e, r) {
        if (t.rootNode.type !== "program") throw new CCError('expected a "program" top-level AST node, got ' + t.rootNode.type + " instead");
        if (t.rootNode.namedChildCount < 1 || !t.rootNode.namedChildren) throw new CCError('empty "program" node');
        const s = e.split(`
`);
        let n = !1;
        const o = [];
        for (const a of t.rootNode.namedChildren)switch(a.type){
            case "comment":
                n = !0;
                continue;
            case "command":
                o.push([
                    a,
                    void 0,
                    void 0
                ]), warnAboutUselessBackslash(a, s, r);
                break;
            case "redirected_statement":
                o.push(extractRedirect(a, e, r)), warnAboutUselessBackslash(a, s, r);
                break;
            case "pipeline":
                o.push(findCurlInPipeline(a, e, r)), warnAboutUselessBackslash(a, s, r);
                break;
            case "heredoc_body":
                continue;
            case "ERROR":
                throw new CCError(`Bash parsing error on line ${a.startPosition.row + 1}:
` + underlineNode(a, e));
            default:
                throw new CCError("found " + JSON.stringify(a.type) + ` AST node, only "command", "pipeline" or "redirected_statement" are supported
` + underlineNode(a, e));
        }
        if (!o.length) throw new CCError('expected a "command" or "redirected_statement" AST node' + (n ? ', only found "comment" nodes' : ""));
        return o;
    }
    function toNameAndArgv(t, e, r) {
        if (t.childCount < 1) throw new CCError(`empty "command" node
` + underlineNode(t, e));
        const s = t.childForFieldName("name"), n = t.childrenForFieldName("argument");
        if (!s) throw new CCError(`found "command" AST node with no "command_name" child
` + underlineNode(t, e));
        return [
            s,
            n
        ];
    }
    function nameToWord(t, e, r) {
        if (t.childCount < 1 || !t.firstChild) throw new CCError(`found empty "command_name" AST node
` + underlineNode(t, e));
        t.childCount > 1 && r.push([
            "extra-command_name-children",
            'expected "command_name" node to only have one child but it has ' + t.childCount
        ]);
        const s = t.firstChild, n = toWord(s, e, r), o = n.toString(), a = firstShellToken(n);
        if (a) {
            if (o !== "$curl") throw new CCError("expected command name to be a simple value but found a " + a.type + `
` + underlineNode(a.syntaxNode, e));
        } else if (o.trim() !== "curl") {
            const l = o.trim();
            throw l ? new CCError('command should begin with "curl" but instead begins with ' + JSON.stringify(clip(l)) + `
` + underlineNode(s, e)) : new CCError(`found command without a command_name
` + underlineNode(s, e));
        }
        return n;
    }
    function tokenize(t, e = []) {
        const r = parser.parse(t);
        warnAboutBadNodes(r, t, e);
        const s = extractCommandNodes(r, t, e), n = [];
        for (const [o, a, l] of s){
            const [u, p] = toNameAndArgv(o, t);
            n.push([
                [
                    nameToWord(u, t, e),
                    ...p.map((d)=>toWord(d, t, e))
                ],
                a,
                l
            ]);
        }
        return n;
    }
    const CURLAUTH_BASIC = 1, CURLAUTH_DIGEST = 2, CURLAUTH_NEGOTIATE = 4, CURLAUTH_NTLM = 8, CURLAUTH_DIGEST_IE = 16, CURLAUTH_NTLM_WB = 32, CURLAUTH_BEARER = 64, CURLAUTH_AWS_SIGV4 = 128, CURLAUTH_ANY = ~CURLAUTH_DIGEST_IE;
    function pickAuth(t) {
        if (t === CURLAUTH_ANY) return "basic";
        const e = [
            [
                CURLAUTH_NEGOTIATE,
                "negotiate"
            ],
            [
                CURLAUTH_BEARER,
                "bearer"
            ],
            [
                CURLAUTH_DIGEST,
                "digest"
            ],
            [
                CURLAUTH_NTLM,
                "ntlm"
            ],
            [
                CURLAUTH_NTLM_WB,
                "ntlm-wb"
            ],
            [
                CURLAUTH_BASIC,
                "basic"
            ],
            [
                CURLAUTH_AWS_SIGV4,
                "aws-sigv4"
            ]
        ];
        for (const [r, s] of e)if (t & r) return s;
        return "none";
    }
    const curlLongOpts = {
        url: {
            type: "string",
            name: "url"
        },
        "dns-ipv4-addr": {
            type: "string",
            name: "dns-ipv4-addr"
        },
        "dns-ipv6-addr": {
            type: "string",
            name: "dns-ipv6-addr"
        },
        "random-file": {
            type: "string",
            name: "random-file"
        },
        "egd-file": {
            type: "string",
            name: "egd-file"
        },
        "oauth2-bearer": {
            type: "string",
            name: "oauth2-bearer"
        },
        "connect-timeout": {
            type: "string",
            name: "connect-timeout"
        },
        "doh-url": {
            type: "string",
            name: "doh-url"
        },
        ciphers: {
            type: "string",
            name: "ciphers"
        },
        "dns-interface": {
            type: "string",
            name: "dns-interface"
        },
        "disable-epsv": {
            type: "bool",
            name: "disable-epsv"
        },
        "no-disable-epsv": {
            type: "bool",
            name: "disable-epsv",
            expand: !1
        },
        "disallow-username-in-url": {
            type: "bool",
            name: "disallow-username-in-url"
        },
        "no-disallow-username-in-url": {
            type: "bool",
            name: "disallow-username-in-url",
            expand: !1
        },
        epsv: {
            type: "bool",
            name: "epsv"
        },
        "no-epsv": {
            type: "bool",
            name: "epsv",
            expand: !1
        },
        "dns-servers": {
            type: "string",
            name: "dns-servers"
        },
        trace: {
            type: "string",
            name: "trace"
        },
        npn: {
            type: "bool",
            name: "npn"
        },
        "no-npn": {
            type: "bool",
            name: "npn",
            expand: !1
        },
        "trace-ascii": {
            type: "string",
            name: "trace-ascii"
        },
        alpn: {
            type: "bool",
            name: "alpn"
        },
        "no-alpn": {
            type: "bool",
            name: "alpn",
            expand: !1
        },
        "limit-rate": {
            type: "string",
            name: "limit-rate"
        },
        rate: {
            type: "string",
            name: "rate"
        },
        compressed: {
            type: "bool",
            name: "compressed"
        },
        "no-compressed": {
            type: "bool",
            name: "compressed",
            expand: !1
        },
        "tr-encoding": {
            type: "bool",
            name: "tr-encoding"
        },
        "no-tr-encoding": {
            type: "bool",
            name: "tr-encoding",
            expand: !1
        },
        digest: {
            type: "bool",
            name: "digest"
        },
        "no-digest": {
            type: "bool",
            name: "digest",
            expand: !1
        },
        negotiate: {
            type: "bool",
            name: "negotiate"
        },
        "no-negotiate": {
            type: "bool",
            name: "negotiate",
            expand: !1
        },
        ntlm: {
            type: "bool",
            name: "ntlm"
        },
        "no-ntlm": {
            type: "bool",
            name: "ntlm",
            expand: !1
        },
        "ntlm-wb": {
            type: "bool",
            name: "ntlm-wb"
        },
        "no-ntlm-wb": {
            type: "bool",
            name: "ntlm-wb",
            expand: !1
        },
        basic: {
            type: "bool",
            name: "basic"
        },
        "no-basic": {
            type: "bool",
            name: "basic",
            expand: !1
        },
        anyauth: {
            type: "bool",
            name: "anyauth"
        },
        "no-anyauth": {
            type: "bool",
            name: "anyauth",
            expand: !1
        },
        wdebug: {
            type: "bool",
            name: "wdebug"
        },
        "no-wdebug": {
            type: "bool",
            name: "wdebug",
            expand: !1
        },
        "ftp-create-dirs": {
            type: "bool",
            name: "ftp-create-dirs"
        },
        "no-ftp-create-dirs": {
            type: "bool",
            name: "ftp-create-dirs",
            expand: !1
        },
        "create-dirs": {
            type: "bool",
            name: "create-dirs"
        },
        "no-create-dirs": {
            type: "bool",
            name: "create-dirs",
            expand: !1
        },
        "create-file-mode": {
            type: "string",
            name: "create-file-mode"
        },
        "max-redirs": {
            type: "string",
            name: "max-redirs"
        },
        "proxy-ntlm": {
            type: "bool",
            name: "proxy-ntlm"
        },
        "no-proxy-ntlm": {
            type: "bool",
            name: "proxy-ntlm",
            expand: !1
        },
        crlf: {
            type: "bool",
            name: "crlf"
        },
        "no-crlf": {
            type: "bool",
            name: "crlf",
            expand: !1
        },
        stderr: {
            type: "string",
            name: "stderr"
        },
        "aws-sigv4": {
            type: "string",
            name: "aws-sigv4"
        },
        interface: {
            type: "string",
            name: "interface"
        },
        krb: {
            type: "string",
            name: "krb"
        },
        krb4: {
            type: "string",
            name: "krb"
        },
        "haproxy-protocol": {
            type: "bool",
            name: "haproxy-protocol"
        },
        "no-haproxy-protocol": {
            type: "bool",
            name: "haproxy-protocol",
            expand: !1
        },
        "haproxy-clientip": {
            type: "string",
            name: "haproxy-clientip"
        },
        "max-filesize": {
            type: "string",
            name: "max-filesize"
        },
        "disable-eprt": {
            type: "bool",
            name: "disable-eprt"
        },
        "no-disable-eprt": {
            type: "bool",
            name: "disable-eprt",
            expand: !1
        },
        eprt: {
            type: "bool",
            name: "eprt"
        },
        "no-eprt": {
            type: "bool",
            name: "eprt",
            expand: !1
        },
        xattr: {
            type: "bool",
            name: "xattr"
        },
        "no-xattr": {
            type: "bool",
            name: "xattr",
            expand: !1
        },
        "ftp-ssl": {
            type: "bool",
            name: "ssl"
        },
        "no-ftp-ssl": {
            type: "bool",
            name: "ssl",
            expand: !1
        },
        ssl: {
            type: "bool",
            name: "ssl"
        },
        "no-ssl": {
            type: "bool",
            name: "ssl",
            expand: !1
        },
        "ftp-pasv": {
            type: "bool",
            name: "ftp-pasv"
        },
        "no-ftp-pasv": {
            type: "bool",
            name: "ftp-pasv",
            expand: !1
        },
        socks5: {
            type: "string",
            name: "socks5"
        },
        "tcp-nodelay": {
            type: "bool",
            name: "tcp-nodelay"
        },
        "no-tcp-nodelay": {
            type: "bool",
            name: "tcp-nodelay",
            expand: !1
        },
        "proxy-digest": {
            type: "bool",
            name: "proxy-digest"
        },
        "no-proxy-digest": {
            type: "bool",
            name: "proxy-digest",
            expand: !1
        },
        "proxy-basic": {
            type: "bool",
            name: "proxy-basic"
        },
        "no-proxy-basic": {
            type: "bool",
            name: "proxy-basic",
            expand: !1
        },
        retry: {
            type: "string",
            name: "retry"
        },
        "retry-connrefused": {
            type: "bool",
            name: "retry-connrefused"
        },
        "no-retry-connrefused": {
            type: "bool",
            name: "retry-connrefused",
            expand: !1
        },
        "retry-delay": {
            type: "string",
            name: "retry-delay"
        },
        "retry-max-time": {
            type: "string",
            name: "retry-max-time"
        },
        "proxy-negotiate": {
            type: "bool",
            name: "proxy-negotiate"
        },
        "no-proxy-negotiate": {
            type: "bool",
            name: "proxy-negotiate",
            expand: !1
        },
        "form-escape": {
            type: "bool",
            name: "form-escape"
        },
        "no-form-escape": {
            type: "bool",
            name: "form-escape",
            expand: !1
        },
        "ftp-account": {
            type: "string",
            name: "ftp-account"
        },
        "proxy-anyauth": {
            type: "bool",
            name: "proxy-anyauth"
        },
        "no-proxy-anyauth": {
            type: "bool",
            name: "proxy-anyauth",
            expand: !1
        },
        "trace-time": {
            type: "bool",
            name: "trace-time"
        },
        "no-trace-time": {
            type: "bool",
            name: "trace-time",
            expand: !1
        },
        "ignore-content-length": {
            type: "bool",
            name: "ignore-content-length"
        },
        "no-ignore-content-length": {
            type: "bool",
            name: "ignore-content-length",
            expand: !1
        },
        "ftp-skip-pasv-ip": {
            type: "bool",
            name: "ftp-skip-pasv-ip"
        },
        "no-ftp-skip-pasv-ip": {
            type: "bool",
            name: "ftp-skip-pasv-ip",
            expand: !1
        },
        "ftp-method": {
            type: "string",
            name: "ftp-method"
        },
        "local-port": {
            type: "string",
            name: "local-port"
        },
        socks4: {
            type: "string",
            name: "socks4"
        },
        socks4a: {
            type: "string",
            name: "socks4a"
        },
        "ftp-alternative-to-user": {
            type: "string",
            name: "ftp-alternative-to-user"
        },
        "ftp-ssl-reqd": {
            type: "bool",
            name: "ssl-reqd"
        },
        "no-ftp-ssl-reqd": {
            type: "bool",
            name: "ssl-reqd",
            expand: !1
        },
        "ssl-reqd": {
            type: "bool",
            name: "ssl-reqd"
        },
        "no-ssl-reqd": {
            type: "bool",
            name: "ssl-reqd",
            expand: !1
        },
        sessionid: {
            type: "bool",
            name: "sessionid"
        },
        "no-sessionid": {
            type: "bool",
            name: "sessionid",
            expand: !1
        },
        "ftp-ssl-control": {
            type: "bool",
            name: "ftp-ssl-control"
        },
        "no-ftp-ssl-control": {
            type: "bool",
            name: "ftp-ssl-control",
            expand: !1
        },
        "ftp-ssl-ccc": {
            type: "bool",
            name: "ftp-ssl-ccc"
        },
        "no-ftp-ssl-ccc": {
            type: "bool",
            name: "ftp-ssl-ccc",
            expand: !1
        },
        "ftp-ssl-ccc-mode": {
            type: "string",
            name: "ftp-ssl-ccc-mode"
        },
        libcurl: {
            type: "string",
            name: "libcurl"
        },
        raw: {
            type: "bool",
            name: "raw"
        },
        "no-raw": {
            type: "bool",
            name: "raw",
            expand: !1
        },
        post301: {
            type: "bool",
            name: "post301"
        },
        "no-post301": {
            type: "bool",
            name: "post301",
            expand: !1
        },
        keepalive: {
            type: "bool",
            name: "keepalive"
        },
        "no-keepalive": {
            type: "bool",
            name: "keepalive",
            expand: !1
        },
        "socks5-hostname": {
            type: "string",
            name: "socks5-hostname"
        },
        "keepalive-time": {
            type: "string",
            name: "keepalive-time"
        },
        post302: {
            type: "bool",
            name: "post302"
        },
        "no-post302": {
            type: "bool",
            name: "post302",
            expand: !1
        },
        noproxy: {
            type: "string",
            name: "noproxy"
        },
        "socks5-gssapi-nec": {
            type: "bool",
            name: "socks5-gssapi-nec"
        },
        "no-socks5-gssapi-nec": {
            type: "bool",
            name: "socks5-gssapi-nec",
            expand: !1
        },
        "proxy1.0": {
            type: "string",
            name: "proxy1.0"
        },
        "tftp-blksize": {
            type: "string",
            name: "tftp-blksize"
        },
        "mail-from": {
            type: "string",
            name: "mail-from"
        },
        "mail-rcpt": {
            type: "string",
            name: "mail-rcpt"
        },
        "ftp-pret": {
            type: "bool",
            name: "ftp-pret"
        },
        "no-ftp-pret": {
            type: "bool",
            name: "ftp-pret",
            expand: !1
        },
        proto: {
            type: "string",
            name: "proto"
        },
        "proto-redir": {
            type: "string",
            name: "proto-redir"
        },
        resolve: {
            type: "string",
            name: "resolve"
        },
        delegation: {
            type: "string",
            name: "delegation"
        },
        "mail-auth": {
            type: "string",
            name: "mail-auth"
        },
        post303: {
            type: "bool",
            name: "post303"
        },
        "no-post303": {
            type: "bool",
            name: "post303",
            expand: !1
        },
        metalink: {
            type: "bool",
            name: "metalink"
        },
        "no-metalink": {
            type: "bool",
            name: "metalink",
            expand: !1
        },
        "sasl-authzid": {
            type: "string",
            name: "sasl-authzid"
        },
        "sasl-ir": {
            type: "bool",
            name: "sasl-ir"
        },
        "no-sasl-ir": {
            type: "bool",
            name: "sasl-ir",
            expand: !1
        },
        "test-event": {
            type: "bool",
            name: "test-event"
        },
        "no-test-event": {
            type: "bool",
            name: "test-event",
            expand: !1
        },
        "unix-socket": {
            type: "string",
            name: "unix-socket"
        },
        "path-as-is": {
            type: "bool",
            name: "path-as-is"
        },
        "no-path-as-is": {
            type: "bool",
            name: "path-as-is",
            expand: !1
        },
        "socks5-gssapi-service": {
            type: "string",
            name: "proxy-service-name"
        },
        "proxy-service-name": {
            type: "string",
            name: "proxy-service-name"
        },
        "service-name": {
            type: "string",
            name: "service-name"
        },
        "proto-default": {
            type: "string",
            name: "proto-default"
        },
        "expect100-timeout": {
            type: "string",
            name: "expect100-timeout"
        },
        "tftp-no-options": {
            type: "bool",
            name: "tftp-no-options"
        },
        "no-tftp-no-options": {
            type: "bool",
            name: "tftp-no-options",
            expand: !1
        },
        "connect-to": {
            type: "string",
            name: "connect-to"
        },
        "abstract-unix-socket": {
            type: "string",
            name: "abstract-unix-socket"
        },
        "tls-max": {
            type: "string",
            name: "tls-max"
        },
        "suppress-connect-headers": {
            type: "bool",
            name: "suppress-connect-headers"
        },
        "no-suppress-connect-headers": {
            type: "bool",
            name: "suppress-connect-headers",
            expand: !1
        },
        "compressed-ssh": {
            type: "bool",
            name: "compressed-ssh"
        },
        "no-compressed-ssh": {
            type: "bool",
            name: "compressed-ssh",
            expand: !1
        },
        "happy-eyeballs-timeout-ms": {
            type: "string",
            name: "happy-eyeballs-timeout-ms"
        },
        "retry-all-errors": {
            type: "bool",
            name: "retry-all-errors"
        },
        "no-retry-all-errors": {
            type: "bool",
            name: "retry-all-errors",
            expand: !1
        },
        "trace-ids": {
            type: "bool",
            name: "trace-ids"
        },
        "no-trace-ids": {
            type: "bool",
            name: "trace-ids",
            expand: !1
        },
        "http1.0": {
            type: "bool",
            name: "http1.0"
        },
        "http1.1": {
            type: "bool",
            name: "http1.1"
        },
        http2: {
            type: "bool",
            name: "http2"
        },
        "http2-prior-knowledge": {
            type: "bool",
            name: "http2-prior-knowledge"
        },
        http3: {
            type: "bool",
            name: "http3"
        },
        "http3-only": {
            type: "bool",
            name: "http3-only"
        },
        "http0.9": {
            type: "bool",
            name: "http0.9"
        },
        "no-http0.9": {
            type: "bool",
            name: "http0.9",
            expand: !1
        },
        "proxy-http2": {
            type: "bool",
            name: "proxy-http2"
        },
        "no-proxy-http2": {
            type: "bool",
            name: "proxy-http2",
            expand: !1
        },
        tlsv1: {
            type: "bool",
            name: "tlsv1"
        },
        "tlsv1.0": {
            type: "bool",
            name: "tlsv1.0"
        },
        "tlsv1.1": {
            type: "bool",
            name: "tlsv1.1"
        },
        "tlsv1.2": {
            type: "bool",
            name: "tlsv1.2"
        },
        "tlsv1.3": {
            type: "bool",
            name: "tlsv1.3"
        },
        "tls13-ciphers": {
            type: "string",
            name: "tls13-ciphers"
        },
        "proxy-tls13-ciphers": {
            type: "string",
            name: "proxy-tls13-ciphers"
        },
        sslv2: {
            type: "bool",
            name: "sslv2"
        },
        sslv3: {
            type: "bool",
            name: "sslv3"
        },
        ipv4: {
            type: "bool",
            name: "ipv4"
        },
        ipv6: {
            type: "bool",
            name: "ipv6"
        },
        append: {
            type: "bool",
            name: "append"
        },
        "no-append": {
            type: "bool",
            name: "append",
            expand: !1
        },
        "user-agent": {
            type: "string",
            name: "user-agent"
        },
        cookie: {
            type: "string",
            name: "cookie"
        },
        "alt-svc": {
            type: "string",
            name: "alt-svc"
        },
        hsts: {
            type: "string",
            name: "hsts"
        },
        "use-ascii": {
            type: "bool",
            name: "use-ascii"
        },
        "no-use-ascii": {
            type: "bool",
            name: "use-ascii",
            expand: !1
        },
        "cookie-jar": {
            type: "string",
            name: "cookie-jar"
        },
        "continue-at": {
            type: "string",
            name: "continue-at"
        },
        data: {
            type: "string",
            name: "data"
        },
        "data-raw": {
            type: "string",
            name: "data-raw"
        },
        "data-ascii": {
            type: "string",
            name: "data-ascii"
        },
        "data-binary": {
            type: "string",
            name: "data-binary"
        },
        "data-urlencode": {
            type: "string",
            name: "data-urlencode"
        },
        json: {
            type: "string",
            name: "json"
        },
        "url-query": {
            type: "string",
            name: "url-query"
        },
        "dump-header": {
            type: "string",
            name: "dump-header"
        },
        referer: {
            type: "string",
            name: "referer"
        },
        cert: {
            type: "string",
            name: "cert"
        },
        cacert: {
            type: "string",
            name: "cacert"
        },
        "cert-type": {
            type: "string",
            name: "cert-type"
        },
        key: {
            type: "string",
            name: "key"
        },
        "key-type": {
            type: "string",
            name: "key-type"
        },
        pass: {
            type: "string",
            name: "pass"
        },
        engine: {
            type: "string",
            name: "engine"
        },
        "ca-native": {
            type: "bool",
            name: "ca-native"
        },
        "no-ca-native": {
            type: "bool",
            name: "ca-native",
            expand: !1
        },
        "proxy-ca-native": {
            type: "bool",
            name: "proxy-ca-native"
        },
        "no-proxy-ca-native": {
            type: "bool",
            name: "proxy-ca-native",
            expand: !1
        },
        capath: {
            type: "string",
            name: "capath"
        },
        pubkey: {
            type: "string",
            name: "pubkey"
        },
        hostpubmd5: {
            type: "string",
            name: "hostpubmd5"
        },
        hostpubsha256: {
            type: "string",
            name: "hostpubsha256"
        },
        crlfile: {
            type: "string",
            name: "crlfile"
        },
        tlsuser: {
            type: "string",
            name: "tlsuser"
        },
        tlspassword: {
            type: "string",
            name: "tlspassword"
        },
        tlsauthtype: {
            type: "string",
            name: "tlsauthtype"
        },
        "ssl-allow-beast": {
            type: "bool",
            name: "ssl-allow-beast"
        },
        "no-ssl-allow-beast": {
            type: "bool",
            name: "ssl-allow-beast",
            expand: !1
        },
        "ssl-auto-client-cert": {
            type: "bool",
            name: "ssl-auto-client-cert"
        },
        "no-ssl-auto-client-cert": {
            type: "bool",
            name: "ssl-auto-client-cert",
            expand: !1
        },
        "proxy-ssl-auto-client-cert": {
            type: "bool",
            name: "proxy-ssl-auto-client-cert"
        },
        "no-proxy-ssl-auto-client-cert": {
            type: "bool",
            name: "proxy-ssl-auto-client-cert",
            expand: !1
        },
        pinnedpubkey: {
            type: "string",
            name: "pinnedpubkey"
        },
        "proxy-pinnedpubkey": {
            type: "string",
            name: "proxy-pinnedpubkey"
        },
        "cert-status": {
            type: "bool",
            name: "cert-status"
        },
        "no-cert-status": {
            type: "bool",
            name: "cert-status",
            expand: !1
        },
        "doh-cert-status": {
            type: "bool",
            name: "doh-cert-status"
        },
        "no-doh-cert-status": {
            type: "bool",
            name: "doh-cert-status",
            expand: !1
        },
        "false-start": {
            type: "bool",
            name: "false-start"
        },
        "no-false-start": {
            type: "bool",
            name: "false-start",
            expand: !1
        },
        "ssl-no-revoke": {
            type: "bool",
            name: "ssl-no-revoke"
        },
        "no-ssl-no-revoke": {
            type: "bool",
            name: "ssl-no-revoke",
            expand: !1
        },
        "ssl-revoke-best-effort": {
            type: "bool",
            name: "ssl-revoke-best-effort"
        },
        "no-ssl-revoke-best-effort": {
            type: "bool",
            name: "ssl-revoke-best-effort",
            expand: !1
        },
        "tcp-fastopen": {
            type: "bool",
            name: "tcp-fastopen"
        },
        "no-tcp-fastopen": {
            type: "bool",
            name: "tcp-fastopen",
            expand: !1
        },
        "proxy-tlsuser": {
            type: "string",
            name: "proxy-tlsuser"
        },
        "proxy-tlspassword": {
            type: "string",
            name: "proxy-tlspassword"
        },
        "proxy-tlsauthtype": {
            type: "string",
            name: "proxy-tlsauthtype"
        },
        "proxy-cert": {
            type: "string",
            name: "proxy-cert"
        },
        "proxy-cert-type": {
            type: "string",
            name: "proxy-cert-type"
        },
        "proxy-key": {
            type: "string",
            name: "proxy-key"
        },
        "proxy-key-type": {
            type: "string",
            name: "proxy-key-type"
        },
        "proxy-pass": {
            type: "string",
            name: "proxy-pass"
        },
        "proxy-ciphers": {
            type: "string",
            name: "proxy-ciphers"
        },
        "proxy-crlfile": {
            type: "string",
            name: "proxy-crlfile"
        },
        "proxy-ssl-allow-beast": {
            type: "bool",
            name: "proxy-ssl-allow-beast"
        },
        "no-proxy-ssl-allow-beast": {
            type: "bool",
            name: "proxy-ssl-allow-beast",
            expand: !1
        },
        "login-options": {
            type: "string",
            name: "login-options"
        },
        "proxy-cacert": {
            type: "string",
            name: "proxy-cacert"
        },
        "proxy-capath": {
            type: "string",
            name: "proxy-capath"
        },
        "proxy-insecure": {
            type: "bool",
            name: "proxy-insecure"
        },
        "no-proxy-insecure": {
            type: "bool",
            name: "proxy-insecure",
            expand: !1
        },
        "proxy-tlsv1": {
            type: "bool",
            name: "proxy-tlsv1"
        },
        "socks5-basic": {
            type: "bool",
            name: "socks5-basic"
        },
        "no-socks5-basic": {
            type: "bool",
            name: "socks5-basic",
            expand: !1
        },
        "socks5-gssapi": {
            type: "bool",
            name: "socks5-gssapi"
        },
        "no-socks5-gssapi": {
            type: "bool",
            name: "socks5-gssapi",
            expand: !1
        },
        "etag-save": {
            type: "string",
            name: "etag-save"
        },
        "etag-compare": {
            type: "string",
            name: "etag-compare"
        },
        curves: {
            type: "string",
            name: "curves"
        },
        fail: {
            type: "bool",
            name: "fail"
        },
        "no-fail": {
            type: "bool",
            name: "fail",
            expand: !1
        },
        "fail-early": {
            type: "bool",
            name: "fail-early"
        },
        "no-fail-early": {
            type: "bool",
            name: "fail-early",
            expand: !1
        },
        "styled-output": {
            type: "bool",
            name: "styled-output"
        },
        "no-styled-output": {
            type: "bool",
            name: "styled-output",
            expand: !1
        },
        "mail-rcpt-allowfails": {
            type: "bool",
            name: "mail-rcpt-allowfails"
        },
        "no-mail-rcpt-allowfails": {
            type: "bool",
            name: "mail-rcpt-allowfails",
            expand: !1
        },
        "fail-with-body": {
            type: "bool",
            name: "fail-with-body"
        },
        "no-fail-with-body": {
            type: "bool",
            name: "fail-with-body",
            expand: !1
        },
        "remove-on-error": {
            type: "bool",
            name: "remove-on-error"
        },
        "no-remove-on-error": {
            type: "bool",
            name: "remove-on-error",
            expand: !1
        },
        form: {
            type: "string",
            name: "form"
        },
        "form-string": {
            type: "string",
            name: "form-string"
        },
        globoff: {
            type: "bool",
            name: "globoff"
        },
        "no-globoff": {
            type: "bool",
            name: "globoff",
            expand: !1
        },
        get: {
            type: "bool",
            name: "get"
        },
        "no-get": {
            type: "bool",
            name: "get",
            expand: !1
        },
        "request-target": {
            type: "string",
            name: "request-target"
        },
        help: {
            type: "bool",
            name: "help"
        },
        "no-help": {
            type: "bool",
            name: "help",
            expand: !1
        },
        header: {
            type: "string",
            name: "header"
        },
        "proxy-header": {
            type: "string",
            name: "proxy-header"
        },
        include: {
            type: "bool",
            name: "include"
        },
        "no-include": {
            type: "bool",
            name: "include",
            expand: !1
        },
        head: {
            type: "bool",
            name: "head"
        },
        "no-head": {
            type: "bool",
            name: "head",
            expand: !1
        },
        "junk-session-cookies": {
            type: "bool",
            name: "junk-session-cookies"
        },
        "no-junk-session-cookies": {
            type: "bool",
            name: "junk-session-cookies",
            expand: !1
        },
        "remote-header-name": {
            type: "bool",
            name: "remote-header-name"
        },
        "no-remote-header-name": {
            type: "bool",
            name: "remote-header-name",
            expand: !1
        },
        insecure: {
            type: "bool",
            name: "insecure"
        },
        "no-insecure": {
            type: "bool",
            name: "insecure",
            expand: !1
        },
        "doh-insecure": {
            type: "bool",
            name: "doh-insecure"
        },
        "no-doh-insecure": {
            type: "bool",
            name: "doh-insecure",
            expand: !1
        },
        config: {
            type: "string",
            name: "config"
        },
        "list-only": {
            type: "bool",
            name: "list-only"
        },
        "no-list-only": {
            type: "bool",
            name: "list-only",
            expand: !1
        },
        location: {
            type: "bool",
            name: "location"
        },
        "no-location": {
            type: "bool",
            name: "location",
            expand: !1
        },
        "location-trusted": {
            type: "bool",
            name: "location-trusted"
        },
        "no-location-trusted": {
            type: "bool",
            name: "location-trusted",
            expand: !1
        },
        "max-time": {
            type: "string",
            name: "max-time"
        },
        manual: {
            type: "bool",
            name: "manual"
        },
        "no-manual": {
            type: "bool",
            name: "manual",
            expand: !1
        },
        netrc: {
            type: "bool",
            name: "netrc"
        },
        "no-netrc": {
            type: "bool",
            name: "netrc",
            expand: !1
        },
        "netrc-optional": {
            type: "bool",
            name: "netrc-optional"
        },
        "no-netrc-optional": {
            type: "bool",
            name: "netrc-optional",
            expand: !1
        },
        "netrc-file": {
            type: "string",
            name: "netrc-file"
        },
        buffer: {
            type: "bool",
            name: "buffer"
        },
        "no-buffer": {
            type: "bool",
            name: "buffer",
            expand: !1
        },
        output: {
            type: "string",
            name: "output"
        },
        "remote-name": {
            type: "bool",
            name: "remote-name"
        },
        "no-remote-name": {
            type: "bool",
            name: "remote-name",
            expand: !1
        },
        "remote-name-all": {
            type: "bool",
            name: "remote-name-all"
        },
        "no-remote-name-all": {
            type: "bool",
            name: "remote-name-all",
            expand: !1
        },
        "output-dir": {
            type: "string",
            name: "output-dir"
        },
        clobber: {
            type: "bool",
            name: "clobber"
        },
        "no-clobber": {
            type: "bool",
            name: "clobber",
            expand: !1
        },
        proxytunnel: {
            type: "bool",
            name: "proxytunnel"
        },
        "no-proxytunnel": {
            type: "bool",
            name: "proxytunnel",
            expand: !1
        },
        "ftp-port": {
            type: "string",
            name: "ftp-port"
        },
        disable: {
            type: "bool",
            name: "disable"
        },
        "no-disable": {
            type: "bool",
            name: "disable",
            expand: !1
        },
        quote: {
            type: "string",
            name: "quote"
        },
        range: {
            type: "string",
            name: "range"
        },
        "remote-time": {
            type: "bool",
            name: "remote-time"
        },
        "no-remote-time": {
            type: "bool",
            name: "remote-time",
            expand: !1
        },
        silent: {
            type: "bool",
            name: "silent"
        },
        "no-silent": {
            type: "bool",
            name: "silent",
            expand: !1
        },
        "show-error": {
            type: "bool",
            name: "show-error"
        },
        "no-show-error": {
            type: "bool",
            name: "show-error",
            expand: !1
        },
        "telnet-option": {
            type: "string",
            name: "telnet-option"
        },
        "upload-file": {
            type: "string",
            name: "upload-file"
        },
        user: {
            type: "string",
            name: "user"
        },
        "proxy-user": {
            type: "string",
            name: "proxy-user"
        },
        verbose: {
            type: "bool",
            name: "verbose"
        },
        "no-verbose": {
            type: "bool",
            name: "verbose",
            expand: !1
        },
        version: {
            type: "bool",
            name: "version"
        },
        "no-version": {
            type: "bool",
            name: "version",
            expand: !1
        },
        "write-out": {
            type: "string",
            name: "write-out"
        },
        proxy: {
            type: "string",
            name: "proxy"
        },
        preproxy: {
            type: "string",
            name: "preproxy"
        },
        request: {
            type: "string",
            name: "request"
        },
        "speed-limit": {
            type: "string",
            name: "speed-limit"
        },
        "speed-time": {
            type: "string",
            name: "speed-time"
        },
        "time-cond": {
            type: "string",
            name: "time-cond"
        },
        parallel: {
            type: "bool",
            name: "parallel"
        },
        "no-parallel": {
            type: "bool",
            name: "parallel",
            expand: !1
        },
        "parallel-max": {
            type: "string",
            name: "parallel-max"
        },
        "parallel-immediate": {
            type: "bool",
            name: "parallel-immediate"
        },
        "no-parallel-immediate": {
            type: "bool",
            name: "parallel-immediate",
            expand: !1
        },
        "progress-bar": {
            type: "bool",
            name: "progress-bar"
        },
        "no-progress-bar": {
            type: "bool",
            name: "progress-bar",
            expand: !1
        },
        "progress-meter": {
            type: "bool",
            name: "progress-meter"
        },
        "no-progress-meter": {
            type: "bool",
            name: "progress-meter",
            expand: !1
        },
        next: {
            type: "bool",
            name: "next"
        },
        port: {
            type: "string",
            name: "port",
            removed: "7.3"
        },
        "ftp-ascii": {
            type: "bool",
            name: "use-ascii",
            removed: "7.10.7"
        },
        "3p-url": {
            type: "string",
            name: "3p-url",
            removed: "7.16.0"
        },
        "3p-user": {
            type: "string",
            name: "3p-user",
            removed: "7.16.0"
        },
        "3p-quote": {
            type: "string",
            name: "3p-quote",
            removed: "7.16.0"
        },
        "http2.0": {
            type: "bool",
            name: "http2",
            removed: "7.36.0"
        },
        "no-http2.0": {
            type: "bool",
            name: "http2",
            removed: "7.36.0"
        },
        "telnet-options": {
            type: "string",
            name: "telnet-option",
            removed: "7.49.0"
        },
        "http-request": {
            type: "string",
            name: "request",
            removed: "7.49.0"
        },
        "capath ": {
            type: "string",
            name: "capath",
            removed: "7.49.0"
        },
        ftpport: {
            type: "string",
            name: "ftp-port",
            removed: "7.49.0"
        },
        environment: {
            type: "bool",
            name: "environment",
            removed: "7.54.1"
        },
        "no-tlsv1": {
            type: "bool",
            name: "tlsv1",
            removed: "7.54.1"
        },
        "no-tlsv1.2": {
            type: "bool",
            name: "tlsv1.2",
            removed: "7.54.1"
        },
        "no-http2-prior-knowledge": {
            type: "bool",
            name: "http2-prior-knowledge",
            removed: "7.54.1"
        },
        "no-ipv6": {
            type: "bool",
            name: "ipv6",
            removed: "7.54.1"
        },
        "no-ipv4": {
            type: "bool",
            name: "ipv4",
            removed: "7.54.1"
        },
        "no-sslv2": {
            type: "bool",
            name: "sslv2",
            removed: "7.54.1"
        },
        "no-tlsv1.0": {
            type: "bool",
            name: "tlsv1.0",
            removed: "7.54.1"
        },
        "no-tlsv1.1": {
            type: "bool",
            name: "tlsv1.1",
            removed: "7.54.1"
        },
        "no-sslv3": {
            type: "bool",
            name: "sslv3",
            removed: "7.54.1"
        },
        "no-http1.0": {
            type: "bool",
            name: "http1.0",
            removed: "7.54.1"
        },
        "no-next": {
            type: "bool",
            name: "next",
            removed: "7.54.1"
        },
        "no-tlsv1.3": {
            type: "bool",
            name: "tlsv1.3",
            removed: "7.54.1"
        },
        "no-environment": {
            type: "bool",
            name: "environment",
            removed: "7.54.1"
        },
        "no-http1.1": {
            type: "bool",
            name: "http1.1",
            removed: "7.54.1"
        },
        "no-proxy-tlsv1": {
            type: "bool",
            name: "proxy-tlsv1",
            removed: "7.54.1"
        },
        "no-http2": {
            type: "bool",
            name: "http2",
            removed: "7.54.1"
        }
    }, curlLongOptsShortened = {};
    for (const [t, e] of Object.entries(curlLongOpts)){
        const r = "expand" in e ? e.expand : !0, s = "removed" in e ? e.removed : !1;
        if (r && !s) for(let n = 1; n < t.length; n++){
            const o = t.slice(0, n);
            Object.prototype.hasOwnProperty.call(curlLongOptsShortened, o) ? curlLongOptsShortened[o] = null : Object.prototype.hasOwnProperty.call(curlLongOpts, o) || (curlLongOptsShortened[o] = e);
        }
    }
    const COMMON_SUPPORTED_ARGS = [
        "url",
        "proto-default",
        "globoff",
        "disallow-username-in-url",
        "request",
        "get",
        "head",
        "no-head",
        "header",
        "user-agent",
        "referer",
        "range",
        "time-cond",
        "cookie",
        "oauth2-bearer",
        "user",
        "basic",
        "no-basic",
        "data",
        "data-raw",
        "data-ascii",
        "data-binary",
        "data-urlencode",
        "json",
        "url-query"
    ];
    function toBoolean(t) {
        return t.startsWith("no-disable-") ? !0 : !(t.startsWith("disable-") || t.startsWith("no-"));
    }
    const curlShortOpts = {
        0: "http1.0",
        1: "tlsv1",
        2: "sslv2",
        3: "sslv3",
        4: "ipv4",
        6: "ipv6",
        a: "append",
        A: "user-agent",
        b: "cookie",
        B: "use-ascii",
        c: "cookie-jar",
        C: "continue-at",
        d: "data",
        D: "dump-header",
        e: "referer",
        E: "cert",
        f: "fail",
        F: "form",
        g: "globoff",
        G: "get",
        h: "help",
        H: "header",
        i: "include",
        I: "head",
        j: "junk-session-cookies",
        J: "remote-header-name",
        k: "insecure",
        K: "config",
        l: "list-only",
        L: "location",
        m: "max-time",
        M: "manual",
        n: "netrc",
        N: "no-buffer",
        o: "output",
        O: "remote-name",
        p: "proxytunnel",
        P: "ftp-port",
        q: "disable",
        Q: "quote",
        r: "range",
        R: "remote-time",
        s: "silent",
        S: "show-error",
        t: "telnet-option",
        T: "upload-file",
        u: "user",
        U: "proxy-user",
        v: "verbose",
        V: "version",
        w: "write-out",
        x: "proxy",
        X: "request",
        Y: "speed-limit",
        y: "speed-time",
        z: "time-cond",
        Z: "parallel",
        "#": "progress-bar",
        ":": "next"
    }, changedShortOpts = {
        p: "used to be short for --port <port> (a since-deleted flag) until curl 7.3",
        t: "used to be short for --upload (a since-deleted boolean flag) until curl 7.7",
        c: "used to be short for --continue (a since-deleted boolean flag) until curl 7.9",
        "@": "used to be short for --create-dirs until curl 7.10.7",
        Z: "used to be short for --max-redirs <num> until curl 7.10.7",
        9: "used to be short for --crlf until curl 7.10.8",
        8: "used to be short for --stderr <file> until curl 7.10.8",
        7: "used to be short for --interface <name> until curl 7.10.8",
        6: "used to be short for --krb <level> (which itself used to be --krb4 <level>) until curl 7.10.8",
        5: "used to be another way to specify the url until curl 7.10.8",
        "*": "used to be another way to specify the url until curl 7.49.0",
        "~": "used to be short for --xattr until curl 7.49.0"
    }, canBeList = new Set([
        "connect-to",
        "cookie",
        "data",
        "form",
        "header",
        "hsts",
        "mail-rcpt",
        "output",
        "proxy-header",
        "quote",
        "resolve",
        "telnet-option",
        "upload-file",
        "url-query",
        "url"
    ]);
    function checkSupported(t, e, r, s) {
        s && !s.has(r.name) && warnf(t, [
            r.name,
            e + " is not a supported option" + (r.removed ? ", it was removed in curl " + r.removed : "")
        ]);
    }
    function pushProp(t, e, r) {
        return Object.prototype.hasOwnProperty.call(t, e) || (t[e] = []), t[e].push(r), t;
    }
    function pushArgValue(t, e, r, s) {
        switch(r){
            case "data":
            case "data-ascii":
                return pushProp(e, "data", [
                    "data",
                    s
                ]);
            case "data-binary":
                return pushProp(e, "data", [
                    s.startsWith("@") ? "binary" : "data",
                    s
                ]);
            case "data-raw":
                return pushProp(e, "data", [
                    s.startsWith("@") ? "raw" : "data",
                    s
                ]);
            case "data-urlencode":
                return pushProp(e, "data", [
                    "urlencode",
                    s
                ]);
            case "json":
                return e.json = !0, pushProp(e, "data", [
                    "json",
                    s
                ]);
            case "url-query":
                return s.startsWith("+") ? pushProp(e, "url-query", [
                    "raw",
                    s.slice(1)
                ]) : pushProp(e, "url-query", [
                    "urlencode",
                    s
                ]);
            case "form":
                return pushProp(e, "form", {
                    value: s,
                    type: "form"
                });
            case "form-string":
                return pushProp(e, "form", {
                    value: s,
                    type: "string"
                });
            case "aws-sigv4":
                e.authtype |= CURLAUTH_AWS_SIGV4;
                break;
            case "oauth2-bearer":
                e.authtype |= CURLAUTH_BEARER;
                break;
            case "unix-socket":
            case "abstract-unix-socket":
                pushProp(e, "unix-socket", s);
                break;
            case "trace":
            case "trace-ascii":
            case "stderr":
            case "libcurl":
            case "config":
            case "parallel-max":
                t[r] = s;
                break;
            case "language":
                t[r] = s.toString();
                return;
        }
        return pushProp(e, r, s);
    }
    function setArgValue(t, e, r, s) {
        switch(r){
            case "digest":
                s ? e.authtype |= CURLAUTH_DIGEST : e.authtype &= ~CURLAUTH_DIGEST;
                break;
            case "proxy-digest":
                s ? e.proxyauthtype |= CURLAUTH_DIGEST : e.proxyauthtype &= ~CURLAUTH_DIGEST;
                break;
            case "negotiate":
                s ? e.authtype |= CURLAUTH_NEGOTIATE : e.authtype &= ~CURLAUTH_NEGOTIATE;
                break;
            case "proxy-negotiate":
                s ? e.proxyauthtype |= CURLAUTH_NEGOTIATE : e.proxyauthtype &= ~CURLAUTH_NEGOTIATE;
                break;
            case "ntlm":
                s ? e.authtype |= CURLAUTH_NTLM : e.authtype &= ~CURLAUTH_NTLM;
                break;
            case "proxy-ntlm":
                s ? e.proxyauthtype |= CURLAUTH_NTLM : e.proxyauthtype &= ~CURLAUTH_NTLM;
                break;
            case "ntlm-wb":
                s ? e.authtype |= CURLAUTH_NTLM_WB : e.authtype &= ~CURLAUTH_NTLM_WB;
                break;
            case "basic":
                s ? e.authtype |= CURLAUTH_BASIC : e.authtype &= ~CURLAUTH_BASIC;
                break;
            case "proxy-basic":
                s ? e.proxyauthtype |= CURLAUTH_BASIC : e.proxyauthtype &= ~CURLAUTH_BASIC;
                break;
            case "anyauth":
                s && (e.authtype = CURLAUTH_ANY);
                break;
            case "proxy-anyauth":
                s && (e.proxyauthtype = CURLAUTH_ANY);
                break;
            case "location":
                e.location = s;
                break;
            case "location-trusted":
                e.location = s, e["location-trusted"] = s;
                break;
            case "http1.0":
                e.httpVersion = "1.0";
                break;
            case "http1.1":
                e.httpVersion = "1.1";
                break;
            case "http2":
                e.httpVersion = "2";
                break;
            case "http2-prior-knowledge":
                e.httpVersion = "2-prior-knowledge";
                break;
            case "http3":
                e.httpVersion = "3";
                break;
            case "http3-only":
                e.httpVersion = "3-only";
                break;
            case "tlsv1":
                e.tlsVersion = "1";
                break;
            case "tlsv1.0":
                e.tlsVersion = "1.0";
                break;
            case "tlsv1.1":
                e.tlsVersion = "1.1";
                break;
            case "tlsv1.2":
                e.tlsVersion = "1.2";
                break;
            case "tlsv1.3":
                e.tlsVersion = "1.3";
                break;
            case "verbose":
            case "version":
            case "trace-time":
            case "test-event":
            case "progress-bar":
            case "progress-meter":
            case "fail-early":
            case "styled-output":
            case "help":
            case "silent":
            case "show-error":
            case "parallel":
            case "parallel-immediate":
            case "stdin":
                t[r] = s;
                break;
            case "next":
                s && e.url && e.url.length > 0 && e.url.length >= (e["upload-file"] || []).length && e.url.length >= (e.output || []).length && (e = {
                    authtype: CURLAUTH_BASIC,
                    proxyauthtype: CURLAUTH_BASIC
                }, t.configs.push(e));
                break;
            default:
                e[r] = s;
        }
        return e;
    }
    function parseArgs(t, e = curlLongOpts, r = curlLongOptsShortened, s = curlShortOpts, n, o = []) {
        let a = {
            authtype: CURLAUTH_BASIC,
            proxyauthtype: CURLAUTH_BASIC
        };
        const l = {
            configs: [
                a
            ],
            warnings: o
        }, u = [];
        for(let p = 1, d = !0; p < t.length; p++){
            const c = t[p];
            if (d && c.startsWith("-")) if (eq(c, "--")) d = !1;
            else if (c.startsWith("--")) {
                const m = firstShellToken(c);
                if (m) throw new CCError("this " + m.type + " could " + (m.type === "command" ? "return" : "be") + ` anything
` + underlineNode(m.syntaxNode));
                const h = c.toString(), w = h.slice(2);
                let y = r[w];
                if (typeof y > "u" && (y = e[w]), y === null) throw new CCError("option " + h + ": is ambiguous");
                if (typeof y > "u") throw new CCError("option " + h + ": is unknown");
                if (y.type === "string") {
                    if (p++, p >= t.length) throw new CCError("option " + h + ": requires parameter");
                    pushArgValue(l, a, y.name, t[p]);
                } else a = setArgValue(l, a, y.name, toBoolean(h.slice(2)));
                checkSupported(l, h, y, n), u.push([
                    y.name,
                    h
                ]);
            } else {
                if (c.length === 1) if (Object.prototype.hasOwnProperty.call(s, "")) {
                    const m = s[""], h = e[m];
                    if (h === null) throw new CCError("option -: is unknown");
                    a = setArgValue(l, a, h.name, toBoolean(m)), u.push([
                        h.name,
                        "-"
                    ]);
                } else throw new CCError("option -: is unknown");
                for(let m = 1; m < c.length; m++){
                    const h = c.get(m);
                    if (typeof h != "string") throw new CCError("this " + h.type + " could " + (h.type === "command" ? "return" : "be") + ` anything
` + underlineNode(h.syntaxNode));
                    if (!has(s, h)) throw has(changedShortOpts, h) ? new CCError("option " + c + ": " + changedShortOpts[h]) : new CCError("option " + c + ": is unknown");
                    const w = h, y = s[w], T = e[y];
                    if (T === null) throw new CCError("ambiguous short option -" + h);
                    if (T.type === "string") {
                        let E;
                        if (m + 1 < c.length) E = c.slice(m + 1), m = c.length;
                        else if (p + 1 < t.length) p++, E = t[p];
                        else throw new CCError("option " + c.toString() + ": requires parameter");
                        pushArgValue(l, a, T.name, E);
                    } else a = setArgValue(l, a, T.name, toBoolean(y));
                    w && (checkSupported(l, "-" + w, T, n), u.push([
                        T.name,
                        "-" + w
                    ]));
                }
            }
            else {
                if (typeof c != "string" && c.tokens.length && typeof c.tokens[0] != "string") {
                    const m = c.tokens.length === 1 ? "is" : "begins with";
                    o.push([
                        "ambiguous argument",
                        "argument " + m + " a " + c.tokens[0].type + `, assuming it's a URL
` + underlineNode(c.tokens[0].syntaxNode)
                    ]);
                }
                pushArgValue(l, a, "url", c), u.push([
                    "url",
                    "--url"
                ]);
            }
        }
        for (const p of l.configs)for (const [d, c] of Object.entries(p))Array.isArray(c) && !canBeList.has(d) && (p[d] = c[c.length - 1]);
        return [
            l,
            u
        ];
    }
    const COMMA_SEPARATED = new Set([
        "A-IM",
        "Accept",
        "Accept-Charset",
        "Accept-Encoding",
        "Accept-Language",
        "Access-Control-Request-Headers",
        "Cache-Control",
        "Connection",
        "Content-Encoding",
        "Expect",
        "Forwarded",
        "If-Match",
        "If-None-Match",
        "Range",
        "TE",
        "Trailer",
        "Transfer-Encoding",
        "Upgrade",
        "Via",
        "Warning"
    ].map((t)=>t.toLowerCase())), SEMICOLON_SEPARATED = new Set([
        "Content-Type",
        "Cookie",
        "Prefer"
    ].map((t)=>t.toLowerCase()));
    class Headers {
        constructor(e, r = [], s = "--header/H"){
            let n = [];
            if (e) for (const a of e){
                if (a.startsWith("@")) {
                    r.push([
                        "header-file",
                        "passing a file for " + s + " is not supported: " + JSON.stringify(a.toString())
                    ]);
                    continue;
                }
                if (a.includes(":")) {
                    const [l, u] = a.split(":", 2), d = u && (eq(l, "Host") ? u : u.trim()).toBool() ? u.removeFirstChar(" ") : null;
                    n.push([
                        l,
                        d
                    ]);
                } else if (a.includes(";")) {
                    const [l] = a.split(";", 2);
                    n.push([
                        l,
                        new Word
                    ]);
                }
            }
            this.lowercase = n.length > 0 && n.every((a)=>eq(a[0], a[0].toLowerCase()));
            const o = {};
            for (const [a, l] of n){
                const u = a.toLowerCase().toString();
                o[u] || (o[u] = []), o[u].push([
                    a,
                    l
                ]);
            }
            n = [];
            for (const [a, l] of Object.entries(o)){
                if (l.length === 1) {
                    n.push(l[0]);
                    continue;
                }
                if (l.every((d)=>d[1] === null)) {
                    const d = l[l.length - 1];
                    new Set(l.map((c)=>c[0])).size > 1 && r.push([
                        "repeated-header",
                        `"${d[0]}" header unset ${l.length} times`
                    ]), n.push(d);
                    continue;
                }
                const u = l.filter((d)=>d[1] !== null);
                if (u.length === 1) {
                    n.push(u[0]);
                    continue;
                }
                let p = "";
                if (COMMA_SEPARATED.has(a) ? p = ", " : SEMICOLON_SEPARATED.has(a) && (p = "; "), p) {
                    const d = joinWords(u.map((c)=>c[1]), p);
                    r.push([
                        "repeated-header",
                        `merged ${u.length} "${u[u.length - 1][0]}" headers together with "${p.trim()}"`
                    ]), n.push([
                        u[0][0],
                        d
                    ]);
                    continue;
                }
                r.push([
                    "repeated-header",
                    `found ${u.length} "${u[u.length - 1][0]}" headers, only the last one will be sent`
                ]), n = n.concat(u);
            }
            this.headers = n;
        }
        get length() {
            return this.headers.length;
        }
        *[Symbol.iterator]() {
            for (const e of this.headers)yield e;
        }
        get(e) {
            const r = e.toLowerCase();
            for (const [s, n] of this.headers)if (s.toLowerCase().toString() === r) return n;
        }
        getContentType() {
            const e = this.get("content-type");
            return e && e.split(";")[0].trim().toString();
        }
        has(e) {
            const r = e.toLowerCase();
            for (const s of this.headers)if (eq(s[0].toLowerCase(), r)) return !0;
            return !1;
        }
        setIfMissing(e, r) {
            if (this.has(e)) return !1;
            this.lowercase && (e = e.toLowerCase());
            const s = typeof e == "string" ? new Word(e) : e, n = typeof r == "string" ? new Word(r) : r;
            return this.headers.push([
                s,
                n
            ]), !0;
        }
        prependIfMissing(e, r) {
            if (this.has(e)) return !1;
            this.lowercase && (e = e.toLowerCase());
            const s = typeof e == "string" ? new Word(e) : e, n = typeof r == "string" ? new Word(r) : r;
            return this.headers.unshift([
                s,
                n
            ]), !0;
        }
        set(e, r) {
            this.lowercase && (e = e.toLowerCase());
            const s = typeof e == "string" ? new Word(e) : e, n = typeof r == "string" ? new Word(r) : r, o = s.toLowerCase().toString();
            for(let a = 0; a < this.headers.length; a++)if (eq(this.headers[a][0].toLowerCase(), o)) {
                this.headers[a][1] = n;
                return;
            }
            this.headers.push([
                s,
                n
            ]);
        }
        delete(e) {
            const r = e.toLowerCase();
            for(let s = this.headers.length - 1; s >= 0; s--)this.headers[s][0].toLowerCase().toString() === r && this.headers.splice(s, 1);
        }
        clearNulls() {
            for(let e = this.headers.length - 1; e >= 0; e--)this.headers[e][1] === null && this.headers.splice(e, 1);
        }
        count(e) {
            let r = 0;
            const s = e.toLowerCase();
            for (const n of this.headers || [])n[0].toLowerCase().toString() === s && (r += 1);
            return r;
        }
        toBool() {
            return this.headers.length > 0 && this.headers.some((e)=>e[1] !== null);
        }
    }
    function parseCookiesStrict(t) {
        const e = [];
        for (let r of t.split(";")){
            r = r.replace(/^ /, "");
            const [s, n] = r.split("=", 2);
            if (n === void 0) return null;
            e.push([
                s,
                n
            ]);
        }
        return new Set(e.map((r)=>r[0])).size !== e.length ? null : e;
    }
    function parseCookies(t) {
        const e = [];
        for (let r of t.split(";")){
            if (r = r.trim(), !r) continue;
            const [s, n] = r.split("=", 2);
            e.push([
                s.trim(),
                (n || "").trim()
            ]);
        }
        return new Set(e.map((r)=>r[0])).size !== e.length ? null : e;
    }
    const MAX_IP6LEN = 128;
    function isIpv6(t) {
        return t.length > MAX_IP6LEN ? !1 : !t.includes("-");
    }
    function warnAboutGlobs(t, e) {
        let r = "";
        for(let s = 0; s < e.length; s++){
            const n = e[s];
            if (n === "[" && r !== "\\") {
                let o = s + 1;
                for(; o < e.length && e[o] !== "]";)o++;
                if (o < e.length && e[o] === "]") {
                    const a = e.slice(s, o + 1);
                    isIpv6(a) || warnf(t, [
                        "glob-in-url",
                        `globs in the URL are not supported:
${e}
` + " ".repeat(s) + "^".repeat(a.length)
                    ]), r = "";
                } else {
                    warnf(t, [
                        "unbalanced-glob",
                        `bracket doesn't have a closing bracket:
${e}
${" ".repeat(s)}^`
                    ]);
                    return;
                }
            } else if (n === "{" && r !== "\\") {
                let o = s + 1;
                for(; o < e.length && e[o] !== "}";)o++;
                if (o < e.length && e[o] === "}") {
                    const a = e.slice(s, o + 1);
                    warnf(t, [
                        "glob-in-url",
                        `globs in the URL are not supported:
${e}
` + " ".repeat(s) + "^".repeat(a.length)
                    ]), r = "";
                } else {
                    warnf(t, [
                        "unbalanced-glob",
                        `bracket doesn't have a closing bracket:
${e}
${" ".repeat(s)}^`
                    ]);
                    return;
                }
            }
            r = n;
        }
    }
    function parseurl(t, e, r) {
        var s;
        const n = {
            scheme: new Word,
            host: new Word,
            port: new Word,
            path: new Word,
            query: new Word,
            fragment: new Word
        };
        e.globoff || (r.isString() && warnAboutGlobs(t, r.toString()), r = r.replace(/\\([[\]{}])/g, "$1"));
        let o = null;
        if (r.tokens.length && typeof r.tokens[0] == "string" && (o = r.tokens[0].match(/^([a-zA-Z0-9+-.]*):\/\/*/)), o) {
            const [u, p] = o;
            n.scheme = new Word(p.toLowerCase()), r = r.slice(u.length);
        } else n.scheme = (s = e["proto-default"]) !== null && s !== void 0 ? s : new Word("http");
        !eq(n.scheme, "http") && !eq(n.scheme, "https") && warnf(t, [
            "bad-scheme",
            `Protocol "${n.scheme}" not supported`
        ]);
        const a = r.indexOfFirstChar("/?#");
        if (a !== -1) {
            n.host = r.slice(0, a), n.path = r.slice(a);
            const u = n.path.indexOf("#"), p = n.path.indexOf("?");
            u !== -1 ? (n.fragment = n.path.slice(u), p !== -1 && p < u ? (n.query = n.path.slice(p, u), n.path = n.path.slice(0, p)) : n.path = n.path.slice(0, u)) : p !== -1 && (n.query = n.path.slice(p), n.path = n.path.slice(0, p));
        } else n.host = r;
        const l = n.host.indexOf("@");
        if (l !== -1) {
            const u = n.host.slice(0, l);
            n.host = n.host.slice(l + 1), e["disallow-username-in-url"] ? warnf(t, [
                "login-denied",
                `Found auth in URL but --disallow-username-in-url was passed: ${u.toString()}`
            ]) : (n.auth = u, u.includes(":") ? [n.user, n.password] = u.split(":", 2) : (n.user = u, n.password = new Word));
        }
        return n;
    }
    function _percentEncode(t) {
        return [
            ...UTF8encoder.encode(t)
        ].map((e)=>e >= 65 && e <= 90 || e >= 97 && e <= 122 || e >= 48 && e <= 57 || e === 45 || e === 46 || e === 95 || e === 126 ? String.fromCharCode(e) : "%" + e.toString(16).toUpperCase().padStart(2, "0")).join("");
    }
    function percentEncode(t) {
        const e = [];
        for (const r of t.tokens)typeof r == "string" ? e.push(_percentEncode(r)) : e.push(r);
        return new Word(e);
    }
    function percentEncodePlus(t) {
        const e = [];
        for (const r of t.tokens)typeof r == "string" ? e.push(_percentEncode(r).replace(/%20/g, "+")) : e.push(r);
        return new Word(e);
    }
    function wordDecodeURIComponent(t) {
        const e = [];
        for (const r of t.tokens)typeof r == "string" ? e.push(decodeURIComponent(r)) : e.push(r);
        return new Word(e);
    }
    function parseQueryString(t) {
        if (!t || t.isEmpty()) return [
            null,
            null
        ];
        const e = [];
        for (const a of t.split("&")){
            if (!a.includes("=")) return [
                null,
                null
            ];
            const [l, u] = a.split("=", 2);
            let p, d;
            try {
                p = wordDecodeURIComponent(l.replace(/\+/g, " ")), d = wordDecodeURIComponent(u.replace(/\+/g, " "));
            } catch (h) {
                if (h instanceof URIError) return [
                    null,
                    null
                ];
                throw h;
            }
            const c = percentEncode(p), m = percentEncode(d);
            if (!eq(c, l) && !eq(c.replace(/%20/g, "+"), l) || !eq(m, u) && !eq(m.replace(/%20/g, "+"), u)) return [
                null,
                null
            ];
            e.push([
                p,
                d
            ]);
        }
        const r = {}, s = {};
        let n = null;
        for (const [a, l] of e){
            const u = a.toString();
            if (n === u) s[u].push(l);
            else if (!Object.prototype.hasOwnProperty.call(s, u)) s[u] = [
                l
            ], r[u] = a;
            else return [
                e,
                null
            ];
            n = u;
        }
        const o = [];
        for (const [a, l] of Object.entries(s))o.push([
            r[a],
            l.length === 1 ? l[0] : l
        ]);
        return [
            e,
            o
        ];
    }
    function parseDetails(t, e, r, s, n) {
        for(; r < e.length && e.charAt(r) === ";";){
            for(r += 1; r < e.length && isSpace(e.charAt(r));)r += 1;
            if (r >= e.length) return t;
            const o = e.slice(r);
            if (o.startsWith("type=")) [t.contentType, r] = getParamWord(e, r + 5, n);
            else if (o.startsWith("filename=")) {
                const [a, l] = getParamWord(e, r + 9, n);
                r = l, s.filename ? t.filename = a : n.push([
                    "unsupported-form-detail",
                    "Field file name not allowed here: " + a.toString()
                ]);
            } else if (o.startsWith("encoder=")) {
                const [a, l] = getParamWord(e, r + 8, n);
                r = l, s.encoder ? t.encoder = a : n.push([
                    "unsupported-form-detail",
                    "Field encoder not allowed here: " + a.toString()
                ]);
            } else if (o.startsWith("headers=")) {
                const [a, l] = getParamWord(e, r + 8, n);
                r = l, s.headers ? a.startsWith("@") ? (t.headerFiles === void 0 && (t.headerFiles = []), t.headerFiles.push(a.slice(1))) : (t.headers === void 0 && (t.headers = []), t.headers.push(a)) : n.push([
                    "unsupported-form-detail",
                    "Field headers not allowed here: " + a.toString()
                ]);
            } else r = getParamWord(e, r, n)[1], n.push([
                "unknown-form-detail",
                "skip unknown form field: " + o.toString()
            ]);
        }
        return t;
    }
    function isSpace(t) {
        return typeof t == "string" && (t === " " || t === "	" || t >= `
` && t <= "\r");
    }
    function getParamWord(t, e, r) {
        let s = e;
        if (t.charAt(s) === '"') {
            s += 1;
            const o = [];
            for(; s < t.length;){
                let a = t.charAt(s);
                if (a === "\\") {
                    if (s + 1 < t.length) {
                        const l = t.charAt(s + 1);
                        (l === '"' || l === "\\") && (s += 1, a = t.charAt(s));
                    }
                } else if (a === '"') {
                    s += 1;
                    let l = !1;
                    for(; s < t.length && t.charAt(s) !== ";";)isSpace(t.charAt(s)) || (l = !0), s += 1;
                    return l && r.push([
                        "trailing-form-data",
                        "Trailing data after quoted form parameter"
                    ]), [
                        new Word(o),
                        s
                    ];
                }
                o.push(a), s += 1;
            }
        }
        let n = t.indexOf(";", e);
        return n === -1 && (n = t.length), [
            t.slice(e, n),
            n
        ];
    }
    function getParamPart(t, e, r, s, n) {
        for(; r < e.length && isSpace(e.charAt(r));)r += 1;
        const [o, a] = getParamWord(e, r, n);
        return t.content = o, parseDetails(t, e, a, s, n), t;
    }
    function parseForm(t, e) {
        const r = [];
        let s = 0;
        for (const n of t){
            const o = n.type === "string";
            if (!n.value.includes("=")) throw new CCError('invalid value for --form/-F, missing "=": ' + JSON.stringify(n.value.toString()));
            const [a, l] = n.value.split("=", 2), u = {
                name: a
            };
            if (!o && l.charAt(0) === "(") s += 1, e.push([
                "nested-form",
                'Nested form data with "=(" is not supported, it will be flattened'
            ]), getParamPart(u, l, 1, {
                headers: !0
            }, e);
            else if (!o && a.length === 0 && eq(l, ")")) {
                if (s -= 1, s < 0) throw new CCError("no multipart to terminate: " + JSON.stringify(n.value.toString()));
            } else !o && l.charAt(0) === "@" ? (getParamPart(u, l, 1, {
                filename: !0,
                encoder: !0,
                headers: !0
            }, e), u.contentFile = u.content, delete u.content, (u.filename === null || u.filename === void 0) && (u.filename = u.contentFile), u.contentType === null || u.contentType) : !o && l.charAt(0) === "<" ? (getParamPart(u, l, 1, {
                encoder: !0,
                headers: !0
            }, e), u.contentFile = u.content, delete u.content, u.contentType === null || u.contentType) : o ? u.content = l : getParamPart(u, l, 0, {
                filename: !0,
                encoder: !0,
                headers: !0
            }, e);
            r.push(u);
        }
        return r;
    }
    function buildURL(t, e, r, s, n, o, a) {
        const l = r, u = parseurl(t, e, r);
        s && (u.path.isEmpty() ? u.path = s.prepend("/") : u.path.endsWith("/") && (u.path = u.path.add(s)), e.get && warnf(t, [
            "data-ignored",
            "curl doesn't let you pass --get and --upload-file together"
        ]));
        const p = mergeWords(u.scheme, "://", u.host, u.path, u.query, u.fragment);
        let d = null, c = null, m = null;
        if (u.query.toBool() || e["url-query"] && e["url-query"].length) {
            let x = null, A = [];
            u.query.toBool() && (A.push([
                "raw",
                u.query.slice(1)
            ]), [c, x, m] = buildData(A, o, a), d = c), e["url-query"] && (A = A.concat(e["url-query"]), [c, x, m] = buildData(A, o, a)), u.query = new Word, x && x.toBool() && (u.query = x.prepend("?"));
        }
        const h = mergeWords(u.scheme, "://", u.host, u.path, u.fragment);
        r = mergeWords(u.scheme, "://", u.host, u.path, u.query, u.fragment);
        let w = r, [y, T] = parseQueryString(u.query.toBool() ? u.query.slice(1) : new Word);
        y && y.length ? w = mergeWords(u.scheme, "://", u.host, u.path, u.fragment) : (y = null, T = null);
        let E = new Word("GET");
        e.request && !eq(e.request, "null") ? E = e.request : e.head ? E = new Word("HEAD") : s && s.toBool() ? E = new Word("PUT") : !e.get && (has(e, "data") || has(e, "form")) && (E = new Word("POST"));
        const f = {
            originalUrl: l,
            urlWithoutQueryList: w,
            url: r,
            urlObj: u,
            urlWithOriginalQuery: p,
            urlWithoutQueryArray: h,
            method: E
        };
        m && (f.queryReadsFile = m), y && (f.queryList = y, T && (f.queryDict = T)), c && (f.queryArray = c), d && (f.urlQueryArray = d), s && (eq(s, "-") || eq(s, ".") ? a ? f.uploadFile = a : (o && warnf(t, [
            "upload-file-with-stdin-content",
            "--upload-file with stdin content is not supported"
        ]), f.uploadFile = s) : f.uploadFile = s), n && (f.output = n);
        const _ = e.user || u.auth;
        if (_) {
            const [x, A] = _.split(":", 2);
            f.auth = [
                x,
                A || new Word
            ];
        }
        return f;
    }
    function buildData(t, e, r) {
        const s = [];
        let n = new Word;
        for (const [l, u] of t.entries()){
            const p = u[0];
            let d = u[1], c = null;
            if (l > 0 && p !== "json" && (n = n.append("&")), p === "urlencode") {
                const h = d.includes("=") || !d.includes("@") ? "=" : "@";
                if ((d.includes("@") || d.includes("=")) && ([c, d] = d.split(h, 2)), h === "=") {
                    c && c.toBool() && (n = n.add(c).append("=")), n = n.add(percentEncodePlus(d));
                    continue;
                }
                c = c && c.toBool() ? c : null, d = d.prepend("@");
            }
            let m = null;
            if (p !== "raw" && d.startsWith("@") && (m = d.slice(1), eq(m, "-"))) if (e !== void 0) {
                switch(p){
                    case "binary":
                    case "json":
                        d = e;
                        break;
                    case "urlencode":
                        d = mergeWords(c && c.length ? c.append("=") : new Word, percentEncodePlus(e));
                        break;
                    default:
                        d = e.replace(/[\n\r]/g, "");
                }
                m = null;
            } else r !== void 0 && (m = r);
            if (m !== null) {
                n.toBool() && (s.push(n), n = new Word);
                const h = {
                    filetype: p,
                    filename: m
                };
                c && (h.name = c), s.push(h);
            } else n = n.add(d);
        }
        n.toBool() && s.push(n);
        let o = null;
        const a = mergeWords(...s.map((l)=>l instanceof Word ? l : (o || (o = l.filename.toString()), l.name ? mergeWords(l.name, "=@", l.filename) : l.filename.prepend("@"))));
        return [
            s,
            a,
            o
        ];
    }
    function parseContentType(t) {
        if (!t.includes(";")) return [
            t,
            []
        ];
        const e = t.indexOf(";"), r = t.slice(0, e), s = t.slice(e), n = s.match(/;\s*([^;=]+)=(?:("[^"]*")|([^()<>@,;:\\"/[\]?.=]*))/g);
        if (s.trim() && !n) return null;
        const o = [];
        for (const a of n || []){
            const l = a.match(/;\s*([^;=]+)=(?:("[^"]*")|([^()<>@,;:\\"/[\]?.=]*))/);
            if (!l) return null;
            const u = l[1], p = l[3] || l[2].slice(1, -1);
            o.push([
                u,
                p
            ]);
        }
        return [
            r,
            o
        ];
    }
    function parseBoundary(t) {
        const e = parseContentType(t);
        if (!e) return null;
        for (const [r, s] of e[1])if (r === "boundary") return s;
        return null;
    }
    function parseRawForm(t, e) {
        const r = `\r
--` + e + `--\r
`;
        if (!t.endsWith(r) || (t = t.slice(0, -r.length), e = "--" + e + `\r
`, t && !t.startsWith(e))) return null;
        t = t.slice(e.length);
        const s = t.split(`\r
` + e), n = [];
        let o = !0;
        for (const a of s){
            const l = a.split(`\r
`);
            if (l.length < 2) return null;
            const u = {
                name: new Word,
                content: new Word
            };
            let p = !1;
            const d = [];
            let c = 0;
            for(; c < l.length && l[c].length !== 0; c++){
                const [m, h] = l[c].split(": ", 2);
                if (m === void 0 || h === void 0) return null;
                if (m.toLowerCase() === "content-disposition") {
                    if (p) return null;
                    const w = parseContentType(h);
                    if (!w) return null;
                    const [y, T] = w;
                    if (y !== "form-data") return null;
                    let E = 0;
                    for (const [f, _] of T)switch(f){
                        case "name":
                            u.name = new Word(_);
                            break;
                        case "filename":
                            u.filename = new Word(_);
                            break;
                        default:
                            E++;
                            break;
                    }
                    E && (o = !1), p = !0;
                } else m.toLowerCase() === "content-type" ? u.contentType = new Word(h) : d.push(new Word(l[c]));
            }
            if (d.length && (u.headers = d), !p || c === l.length || u.name.isEmpty()) return null;
            u.content = new Word(l.slice(c + 1).join(`
`)), n.push(u);
        }
        return [
            n,
            o
        ];
    }
    function buildRequest(t, e, r, s) {
        var n, o;
        if (!e.url || !e.url.length) throw new CCError("no URL specified!");
        const a = new Headers(e.header, t.warnings), l = new Headers(e["proxy-header"], t.warnings, "--proxy-header");
        let u;
        const p = [], d = a.get("cookie");
        if (d) {
            const g = parseCookiesStrict(d);
            g && (u = g);
        } else if (d === void 0 && e.cookie) {
            const g = [];
            for (const b of e.cookie)b.includes("=") ? g.push(b) : p.push(b);
            if (g.length) {
                const b = joinWords(e.cookie, "; ");
                a.setIfMissing("Cookie", b);
                const v = parseCookies(b);
                v && (u = v);
            }
        }
        let c = !1;
        if (e["user-agent"] && a.setIfMissing("User-Agent", e["user-agent"]), e.referer) {
            e.referer.includes(";auto") && (c = !0);
            const g = e.referer.replace(/;auto$/, "");
            g.length && a.setIfMissing("Referer", g);
        }
        if (e.range) {
            let g = e.range.prepend("bytes=");
            g.includes("-") || (g = g.append("-")), a.setIfMissing("Range", g);
        }
        if (e["time-cond"]) {
            let g = e["time-cond"], b = "If-Modified-Since";
            switch(g.charAt(0)){
                case "+":
                    g = g.slice(1);
                    break;
                case "-":
                    g = g.slice(1), b = "If-Unmodified-Since";
                    break;
                case "=":
                    g = g.slice(1), b = "Last-Modified";
                    break;
            }
            a.setIfMissing(b, g);
        }
        let m, h, w, y;
        e.data && e.data.length && (e.get ? (e["url-query"] = e.data, delete e.data) : [m, h, w] = buildData(e.data, r, s)), e["url-query"] && ([y] = buildData(e["url-query"], r, s));
        const T = [], E = e["upload-file"] || [], f = e.output || [];
        for (const [g, b] of e.url.entries())T.push(buildURL(t, e, b, E[g], f[g], r, s));
        e.get && e.data && delete e.data, (e["upload-file"] || []).length > e.url.length && warnf(t, [
            "too-many-upload-files",
            "Got more --upload-file/-T options than URLs: " + ((n = e["upload-file"]) === null || n === void 0 ? void 0 : n.map((g)=>JSON.stringify(g.toString())).join(", "))
        ]), (e.output || []).length > e.url.length && warnf(t, [
            "too-many-output-files",
            "Got more --output/-o options than URLs: " + ((o = e.output) === null || o === void 0 ? void 0 : o.map((g)=>JSON.stringify(g.toString())).join(", "))
        ]);
        const _ = {
            urls: T,
            authType: pickAuth(e.authtype),
            proxyAuthType: pickAuth(e.proxyauthtype),
            headers: a,
            proxyHeaders: l
        };
        r && (_.stdin = r), s && (_.stdinFile = s), Object.prototype.hasOwnProperty.call(e, "globoff") && (_.globoff = e.globoff), Object.prototype.hasOwnProperty.call(e, "disallow-username-in-url") && (_.disallowUsernameInUrl = e["disallow-username-in-url"]), Object.prototype.hasOwnProperty.call(e, "path-as-is") && (_.pathAsIs = e["path-as-is"]), c && (_.refererAuto = !0), u && (_.cookies = u), p.length && (_.cookieFiles = p), e["cookie-jar"] && (_.cookieJar = e["cookie-jar"]), Object.prototype.hasOwnProperty.call(e, "junk-session-cookies") && (_.junkSessionCookies = e["junk-session-cookies"]), Object.prototype.hasOwnProperty.call(e, "compressed") && (_.compressed = e.compressed), Object.prototype.hasOwnProperty.call(e, "tr-encoding") && (_.transferEncoding = e["tr-encoding"]), e.include && (_.include = !0), e.json ? (a.setIfMissing("Content-Type", "application/json"), a.setIfMissing("Accept", "application/json")) : e.data ? a.setIfMissing("Content-Type", "application/x-www-form-urlencoded") : e.form && (_.multipartUploads = parseForm(e.form, t.warnings));
        const x = a.getContentType(), A = a.get("Content-Type");
        if (e.data && !w && h && h.isString() && !e.form && !_.multipartUploads && x === "multipart/form-data" && A && A.isString()) {
            const g = parseBoundary(A.toString());
            if (g) {
                const b = parseRawForm(h.toString(), g);
                if (b) {
                    const [v, F] = b;
                    _.multipartUploads = v, F || (_.multipartUploadsDoesntRoundtrip = !0);
                }
            }
        }
        if (Object.prototype.hasOwnProperty.call(e, "form-escape") && (_.formEscape = e["form-escape"]), e["aws-sigv4"] && (_.authType = "aws-sigv4", _.awsSigV4 = e["aws-sigv4"]), _.authType === "bearer" && e["oauth2-bearer"]) {
            const g = e["oauth2-bearer"].prepend("Bearer ");
            a.setIfMissing("Authorization", g), _.oauth2Bearer = e["oauth2-bearer"];
        }
        if (e.delegation && (_.delegation = e.delegation), e.krb && (_.krb = e.krb), e["sasl-authzid"] && (_.saslAuthzid = e["sasl-authzid"]), Object.prototype.hasOwnProperty.call(e, "sasl-ir") && (_.saslIr = e["sasl-ir"]), e.negotiate && (_.authType = "negotiate"), e["service-name"] && (_.serviceName = e["service-name"]), a.clearNulls(), e.data && e.data.length && (_.data = h, w && (_.dataReadsFile = w), _.dataArray = m, _.isDataRaw = !1, _.isDataBinary = (m || []).some((g)=>!(g instanceof Word) && g.filetype === "binary")), y && (_.queryArray = y), Object.prototype.hasOwnProperty.call(e, "ipv4") && (_.ipv4 = e.ipv4), Object.prototype.hasOwnProperty.call(e, "ipv6") && (_.ipv6 = e.ipv6), e.proto && (_.proto = e.proto), e["proto-redir"] && (_.protoRedir = e["proto-redir"]), e["proto-default"] && (_.protoDefault = e["proto-default"]), e["tcp-fastopen"] && (_.tcpFastopen = e["tcp-fastopen"]), e["local-port"]) {
            const [g, b] = e["local-port"].split("-", 1);
            b && b.toBool() ? _.localPort = [
                g,
                b
            ] : _.localPort = [
                e["local-port"],
                null
            ];
        }
        if (Object.prototype.hasOwnProperty.call(e, "ignore-content-length") && (_.ignoreContentLength = e["ignore-content-length"]), e.interface && (_.interface = e.interface), e.ciphers && (_.ciphers = e.ciphers), e.curves && (_.curves = e.curves), e.insecure && (_.insecure = !0), Object.prototype.hasOwnProperty.call(e, "cert-status") && (_.certStatus = e["cert-status"]), e.cert) if (e.cert.startsWith("pkcs11:") || !e.cert.match(/[:\\]/)) _.cert = [
            e.cert,
            null
        ];
        else {
            let g = -1;
            try {
                g = e.cert.search(/(?<!\\)(?:\\\\)*:/);
            } catch  {
                g = e.cert.search(/:/);
            }
            if (g === -1) _.cert = [
                e.cert,
                null
            ];
            else {
                const b = e.cert.slice(0, g), v = e.cert.slice(g + 1);
                v.toBool() ? _.cert = [
                    b,
                    v
                ] : _.cert = [
                    b,
                    null
                ];
            }
        }
        if (e["cert-type"]) {
            const g = e["cert-type"];
            _.certType = g, g.isString() && ![
                "PEM",
                "DER",
                "ENG",
                "P12"
            ].includes(g.toString().toUpperCase()) && warnf(t, [
                "cert-type-unknown",
                "not supported file type " + JSON.stringify(g.toString()) + " for certificate"
            ]);
        }
        return e.key && (_.key = e.key), e["key-type"] && (_.keyType = e["key-type"]), e.pass && (_.pass = e.pass), e.cacert && (_.cacert = e.cacert), Object.prototype.hasOwnProperty.call(e, "ca-native") && (_.caNative = e["ca-native"]), Object.prototype.hasOwnProperty.call(e, "ssl-allow-beast") && (_.sslAllowBeast = e["ssl-allow-beast"]), e.capath && (_.capath = e.capath), e.crlfile && (_.crlfile = e.crlfile), e.pinnedpubkey && (_.pinnedpubkey = e.pinnedpubkey), e["random-file"] && (_.randomFile = e["random-file"]), e["egd-file"] && (_.egdFile = e["egd-file"]), e.hsts && (_.hsts = e.hsts), Object.prototype.hasOwnProperty.call(e, "alpn") && (_.alpn = e.alpn), e.tlsVersion && (_.tlsVersion = e.tlsVersion), e["tls-max"] && (_.tlsMax = e["tls-max"]), e["tls13-ciphers"] && (_.tls13Ciphers = e["tls13-ciphers"]), e.tlsauthtype && (_.tlsauthtype = e.tlsauthtype), e.tlspassword && (_.tlspassword = e.tlspassword), e.tlsuser && (_.tlsuser = e.tlsuser), Object.prototype.hasOwnProperty.call(e, "ssl-allow-beast") && (_.sslAllowBeast = e["ssl-allow-beast"]), Object.prototype.hasOwnProperty.call(e, "ssl-auto-client-cert") && (_.sslAutoClientCert = e["ssl-auto-client-cert"]), Object.prototype.hasOwnProperty.call(e, "ssl-no-revoke") && (_.sslNoRevoke = e["ssl-no-revoke"]), Object.prototype.hasOwnProperty.call(e, "ssl-reqd") && (_.sslReqd = e["ssl-reqd"]), Object.prototype.hasOwnProperty.call(e, "ssl-revoke-best-effort") && (_.sslRevokeBestEffort = e["ssl-revoke-best-effort"]), Object.prototype.hasOwnProperty.call(e, "ssl") && (_.ssl = e.ssl), Object.prototype.hasOwnProperty.call(e, "sslv2") && (_.sslv2 = e.sslv2), Object.prototype.hasOwnProperty.call(e, "sslv3") && (_.sslv3 = e.sslv3), e["doh-url"] && (_.dohUrl = e["doh-url"]), Object.prototype.hasOwnProperty.call(e, "doh-insecure") && (_.dohInsecure = e["doh-insecure"]), Object.prototype.hasOwnProperty.call(e, "doh-cert-status") && (_.dohCertStatus = e["doh-cert-status"]), e.proxy && (_.proxy = e.proxy, _.proxyType && _.proxyType !== "http2" && delete _.proxyType, e["proxy-user"] && (_.proxyAuth = e["proxy-user"])), Object.prototype.hasOwnProperty.call(e, "proxytunnel") && (_.proxytunnel = e.proxytunnel), e.noproxy && (_.noproxy = e.noproxy), e.preproxy && (_.preproxy = e.preproxy), Object.prototype.hasOwnProperty.call(e, "proxy-anyauth") && (_.proxyAnyauth = e["proxy-anyauth"]), Object.prototype.hasOwnProperty.call(e, "proxy-basic") && (_.proxyBasic = e["proxy-basic"]), Object.prototype.hasOwnProperty.call(e, "proxy-digest") && (_.proxyDigest = e["proxy-digest"]), Object.prototype.hasOwnProperty.call(e, "proxy-negotiate") && (_.proxyNegotiate = e["proxy-negotiate"]), Object.prototype.hasOwnProperty.call(e, "proxy-ntlm") && (_.proxyNtlm = e["proxy-ntlm"]), Object.prototype.hasOwnProperty.call(e, "proxy-ca-native") && (_.proxyCaNative = e["proxy-ca-native"]), e["proxy-cacert"] && (_.proxyCacert = e["proxy-cacert"]), e["proxy-capath"] && (_.proxyCapath = e["proxy-capath"]), e["proxy-cert-type"] && (_.proxyCertType = e["proxy-cert-type"]), e["proxy-cert"] && (_.proxyCert = e["proxy-cert"]), e["proxy-ciphers"] && (_.proxyCiphers = e["proxy-ciphers"]), e["proxy-crlfile"] && (_.proxyCrlfile = e["proxy-crlfile"]), e["proxy-http2"] && (_.proxyType = "http2"), e["proxy1.0"] && (_.proxy = e["proxy1.0"], _.proxyType = "http1"), Object.prototype.hasOwnProperty.call(e, "proxy-insecure") && (_.proxyInsecure = e["proxy-insecure"]), e["proxy-key"] && (_.proxyKey = e["proxy-key"]), e["proxy-key-type"] && (_.proxyKeyType = e["proxy-key-type"]), e["proxy-pass"] && (_.proxyPass = e["proxy-pass"]), e["proxy-pinnedpubkey"] && (_.proxyPinnedpubkey = e["proxy-pinnedpubkey"]), e["proxy-pinnedpubkey"] && (_.proxyPinnedpubkey = e["proxy-pinnedpubkey"]), e["proxy-service-name"] && (_.proxyServiceName = e["proxy-service-name"]), Object.prototype.hasOwnProperty.call(e, "proxy-ssl-allow-beast") && (_.proxySslAllowBeast = e["proxy-ssl-allow-beast"]), Object.prototype.hasOwnProperty.call(e, "proxy-ssl-auto-client-cert") && (_.proxySslAutoClientCert = e["proxy-ssl-auto-client-cert"]), e["proxy-tls13-ciphers"] && (_.proxyTls13Ciphers = e["proxy-tls13-ciphers"]), e["proxy-tlsauthtype"] && (_.proxyTlsauthtype = e["proxy-tlsauthtype"], _.proxyTlsauthtype.isString() && !eq(_.proxyTlsauthtype, "SRP") && warnf(t, [
            "proxy-tlsauthtype",
            "proxy-tlsauthtype is not supported: " + _.proxyTlsauthtype
        ])), e["proxy-tlspassword"] && (_.proxyTlspassword = e["proxy-tlspassword"]), e["proxy-tlsuser"] && (_.proxyTlsuser = e["proxy-tlsuser"]), Object.prototype.hasOwnProperty.call(e, "proxy-tlsv1") && (_.proxyTlsv1 = e["proxy-tlsv1"]), e["proxy-user"] && (_.proxyUser = e["proxy-user"]), Object.prototype.hasOwnProperty.call(e, "proxytunnel") && (_.proxytunnel = e.proxytunnel), e.socks4 && (_.proxy = e.socks4, _.proxyType = "socks4"), e.socks4a && (_.proxy = e.socks4a, _.proxyType = "socks4a"), e.socks5 && (_.proxy = e.socks5, _.proxyType = "socks5"), e["socks5-hostname"] && (_.proxy = e["socks5-hostname"], _.proxyType = "socks5-hostname"), Object.prototype.hasOwnProperty.call(e, "socks5-basic") && (_.socks5Basic = e["socks5-basic"]), Object.prototype.hasOwnProperty.call(e, "socks5-gssapi-nec") && (_.socks5GssapiNec = e["socks5-gssapi-nec"]), e["socks5-gssapi-service"] && (_.socks5GssapiService = e["socks5-gssapi-service"]), Object.prototype.hasOwnProperty.call(e, "socks5-gssapi") && (_.socks5Gssapi = e["socks5-gssapi"]), e["haproxy-clientip"] && (_.haproxyClientIp = e["haproxy-clientip"]), Object.prototype.hasOwnProperty.call(e, "haproxy-protocol") && (_.haproxyProtocol = e["haproxy-protocol"]), e["max-time"] && (_.timeout = e["max-time"], e["max-time"].isString() && isNaN(parseFloat(e["max-time"].toString())) && warnf(t, [
            "max-time-not-number",
            "option --max-time: expected a proper numerical parameter: " + JSON.stringify(e["max-time"].toString())
        ])), e["connect-timeout"] && (_.connectTimeout = e["connect-timeout"], e["connect-timeout"].isString() && isNaN(parseFloat(e["connect-timeout"].toString())) && warnf(t, [
            "connect-timeout-not-number",
            "option --connect-timeout: expected a proper numerical parameter: " + JSON.stringify(e["connect-timeout"].toString())
        ])), e["expect100-timeout"] && (_.expect100Timeout = e["expect100-timeout"], e["expect100-timeout"].isString() && isNaN(parseFloat(e["expect100-timeout"].toString())) && warnf(t, [
            "expect100-timeout-not-number",
            "option --expect100-timeout: expected a proper numerical parameter: " + JSON.stringify(e["expect100-timeout"].toString())
        ])), e["happy-eyeballs-timeout-ms"] && (_.happyEyeballsTimeoutMs = e["happy-eyeballs-timeout-ms"]), e["speed-limit"] && (_.speedLimit = e["speed-limit"]), e["speed-time"] && (_.speedTime = e["speed-time"]), e["limit-rate"] && (_.limitRate = e["limit-rate"]), e["max-filesize"] && (_.maxFilesize = e["max-filesize"]), Object.prototype.hasOwnProperty.call(e, "keepalive") && (_.keepAlive = e.keepalive), e["keepalive-time"] && (_.keepAliveTime = e["keepalive-time"]), e["alt-svc"] && (_.altSvc = e["alt-svc"]), Object.prototype.hasOwnProperty.call(e, "location") && (_.followRedirects = e.location), e["location-trusted"] && (_.followRedirectsTrusted = e["location-trusted"]), e["max-redirs"] && (_.maxRedirects = e["max-redirs"].trim(), e["max-redirs"].isString() && !isInt(e["max-redirs"].toString()) && warnf(t, [
            "max-redirs-not-int",
            "option --max-redirs: expected a proper numerical parameter: " + JSON.stringify(e["max-redirs"].toString())
        ])), Object.prototype.hasOwnProperty.call(e, "post301") && (_.post301 = e.post301), Object.prototype.hasOwnProperty.call(e, "post302") && (_.post302 = e.post302), Object.prototype.hasOwnProperty.call(e, "post303") && (_.post303 = e.post303), e.fail && (_.fail = e.fail), e.retry && (_.retry = e.retry), e["retry-max-time"] && (_.retryMaxTime = e["retry-max-time"]), Object.prototype.hasOwnProperty.call(e, "ftp-skip-pasv-ip") && (_.ftpSkipPasvIp = e["ftp-skip-pasv-ip"]), e.httpVersion && ((e.httpVersion === "2" || e.httpVersion === "2-prior-knowledge") && (_.http2 = !0), (e.httpVersion === "3" || e.httpVersion === "3-only") && (_.http3 = !0), _.httpVersion = e.httpVersion), Object.prototype.hasOwnProperty.call(e, "http0.9") && (_.http0_9 = e["http0.9"]), e.resolve && e.resolve.length && (_.resolve = e.resolve), e["connect-to"] && e["connect-to"].length && (_.connectTo = e["connect-to"]), e["unix-socket"] && (_.unixSocket = e["unix-socket"]), e["abstract-unix-socket"] && (_.abstractUnixSocket = e["abstract-unix-socket"]), e["netrc-optional"] ? _.netrc = "optional" : e.netrc || e["netrc-file"] ? _.netrc = "required" : e.netrc === !1 && (_.netrc = "ignored"), e["netrc-file"] && (_.netrcFile = e["netrc-file"]), e["use-ascii"] && (_.useAscii = e["use-ascii"]), e["continue-at"] && (_.continueAt = e["continue-at"]), Object.prototype.hasOwnProperty.call(e, "crlf") && (_.crlf = e.crlf), Object.prototype.hasOwnProperty.call(e, "clobber") && (_.clobber = e.clobber), Object.prototype.hasOwnProperty.call(e, "remote-time") && (_.remoteTime = e["remote-time"]), Object.prototype.hasOwnProperty.call(t, "verbose") && (_.verbose = t.verbose), Object.prototype.hasOwnProperty.call(t, "silent") && (_.silent = t.silent), _;
    }
    function buildRequests(t, e, r) {
        return t.configs.length || warnf(t, [
            "no-configs",
            "got empty config object"
        ]), t.configs.map((s)=>buildRequest(t, s, e, r));
    }
    function getFirst(t, e, r) {
        t.length > 1 && e.push([
            "next",
            "got " + t.length + " curl requests, only converting the first one"
        ]);
        const s = t[0];
        return warnIfPartsIgnored(s, e, r), s;
    }
    function clip(t, e = 30) {
        return t.length > e ? t.slice(0, e - 3) + "..." : t;
    }
    function findCommands(t, e) {
        if (typeof t == "string") return tokenize(t, e);
        if (t.length === 0) throw new CCError("no arguments provided");
        if (t[0].trim() !== "curl") throw new CCError('command should begin with "curl" but instead begins with ' + JSON.stringify(clip(t[0])));
        return [
            [
                t.map((r)=>new Word(r)),
                void 0,
                void 0
            ]
        ];
    }
    function parse(t, e, r = []) {
        let s = [];
        const n = findCommands(t, r);
        for (const [o, a, l] of n){
            const [u] = parseArgs(o, curlLongOpts, curlLongOptsShortened, curlShortOpts, e, r);
            s = s.concat(buildRequests(u, a, l));
        }
        return s;
    }
    var Pattern$5;
    Pattern$5 = function() {
        t.prototype.regex = null, t.prototype.rawRegex = null, t.prototype.cleanedRegex = null, t.prototype.mapping = null;
        function t(e, r) {
            var s, n, o, a, l, u, p, d, c;
            for(r == null && (r = ""), o = "", l = e.length, u = null, n = 0, a = 0; a < l;){
                if (s = e.charAt(a), s === "\\") o += e.slice(a, +(a + 1) + 1 || 9e9), a++;
                else if (s === "(") if (a < l - 2) if (d = e.slice(a, +(a + 2) + 1 || 9e9), d === "(?:") a += 2, o += d;
                else if (d === "(?<") for(n++, a += 2, p = ""; a + 1 < l;){
                    if (c = e.charAt(a + 1), c === ">") {
                        o += "(", a++, p.length > 0 && (u == null && (u = {}), u[p] = n);
                        break;
                    } else p += c;
                    a++;
                }
                else o += s, n++;
                else o += s;
                else o += s;
                a++;
            }
            this.rawRegex = e, this.cleanedRegex = o, this.regex = new RegExp(this.cleanedRegex, "g" + r.replace("g", "")), this.mapping = u;
        }
        return t.prototype.exec = function(e) {
            var r, s, n, o;
            if (this.regex.lastIndex = 0, s = this.regex.exec(e), s == null) return null;
            if (this.mapping != null) {
                o = this.mapping;
                for(n in o)r = o[n], s[n] = s[r];
            }
            return s;
        }, t.prototype.test = function(e) {
            return this.regex.lastIndex = 0, this.regex.test(e);
        }, t.prototype.replace = function(e, r) {
            return this.regex.lastIndex = 0, e.replace(this.regex, r);
        }, t.prototype.replaceAll = function(e, r, s) {
            var n;
            for(s == null && (s = 0), this.regex.lastIndex = 0, n = 0; this.regex.test(e) && (s === 0 || n < s);)this.regex.lastIndex = 0, e = e.replace(this.regex, r), n++;
            return [
                e,
                n
            ];
        }, t;
    }();
    var Pattern_1 = Pattern$5;
    function commonjsRequire(t) {
        throw new Error('Could not dynamically require "' + t + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
    }
    var Pattern$4, Utils$5, hasProp$3 = {}.hasOwnProperty;
    Pattern$4 = Pattern_1;
    Utils$5 = function() {
        function t() {}
        return t.REGEX_LEFT_TRIM_BY_CHAR = {}, t.REGEX_RIGHT_TRIM_BY_CHAR = {}, t.REGEX_SPACES = /\s+/g, t.REGEX_DIGITS = /^\d+$/, t.REGEX_OCTAL = /[^0-7]/gi, t.REGEX_HEXADECIMAL = /[^a-f0-9]/gi, t.PATTERN_DATE = new Pattern$4("^(?<year>[0-9][0-9][0-9][0-9])-(?<month>[0-9][0-9]?)-(?<day>[0-9][0-9]?)(?:(?:[Tt]|[ 	]+)(?<hour>[0-9][0-9]?):(?<minute>[0-9][0-9]):(?<second>[0-9][0-9])(?:.(?<fraction>[0-9]*))?(?:[ 	]*(?<tz>Z|(?<tz_sign>[-+])(?<tz_hour>[0-9][0-9]?)(?::(?<tz_minute>[0-9][0-9]))?))?)?$", "i"), t.LOCAL_TIMEZONE_OFFSET = new Date().getTimezoneOffset() * 60 * 1e3, t.trim = function(e, r) {
            var s, n;
            return r == null && (r = "\\s"), s = this.REGEX_LEFT_TRIM_BY_CHAR[r], s == null && (this.REGEX_LEFT_TRIM_BY_CHAR[r] = s = new RegExp("^" + r + r + "*")), s.lastIndex = 0, n = this.REGEX_RIGHT_TRIM_BY_CHAR[r], n == null && (this.REGEX_RIGHT_TRIM_BY_CHAR[r] = n = new RegExp(r + "" + r + "*$")), n.lastIndex = 0, e.replace(s, "").replace(n, "");
        }, t.ltrim = function(e, r) {
            var s;
            return r == null && (r = "\\s"), s = this.REGEX_LEFT_TRIM_BY_CHAR[r], s == null && (this.REGEX_LEFT_TRIM_BY_CHAR[r] = s = new RegExp("^" + r + r + "*")), s.lastIndex = 0, e.replace(s, "");
        }, t.rtrim = function(e, r) {
            var s;
            return r == null && (r = "\\s"), s = this.REGEX_RIGHT_TRIM_BY_CHAR[r], s == null && (this.REGEX_RIGHT_TRIM_BY_CHAR[r] = s = new RegExp(r + "" + r + "*$")), s.lastIndex = 0, e.replace(s, "");
        }, t.isEmpty = function(e) {
            return !e || e === "" || e === "0" || e instanceof Array && e.length === 0 || this.isEmptyObject(e);
        }, t.isEmptyObject = function(e) {
            var r;
            return e instanceof Object && function() {
                var s;
                s = [];
                for(r in e)hasProp$3.call(e, r) && s.push(r);
                return s;
            }().length === 0;
        }, t.subStrCount = function(e, r, s, n) {
            var o, a, l, u, p, d;
            for(o = 0, e = "" + e, r = "" + r, s != null && (e = e.slice(s)), n != null && (e = e.slice(0, n)), u = e.length, d = r.length, a = l = 0, p = u; 0 <= p ? l < p : l > p; a = 0 <= p ? ++l : --l)r === e.slice(a, d) && (o++, a += d - 1);
            return o;
        }, t.isDigits = function(e) {
            return this.REGEX_DIGITS.lastIndex = 0, this.REGEX_DIGITS.test(e);
        }, t.octDec = function(e) {
            return this.REGEX_OCTAL.lastIndex = 0, parseInt((e + "").replace(this.REGEX_OCTAL, ""), 8);
        }, t.hexDec = function(e) {
            return this.REGEX_HEXADECIMAL.lastIndex = 0, e = this.trim(e), (e + "").slice(0, 2) === "0x" && (e = (e + "").slice(2)), parseInt((e + "").replace(this.REGEX_HEXADECIMAL, ""), 16);
        }, t.utf8chr = function(e) {
            var r;
            return r = String.fromCharCode, 128 > (e %= 2097152) ? r(e) : 2048 > e ? r(192 | e >> 6) + r(128 | e & 63) : 65536 > e ? r(224 | e >> 12) + r(128 | e >> 6 & 63) + r(128 | e & 63) : r(240 | e >> 18) + r(128 | e >> 12 & 63) + r(128 | e >> 6 & 63) + r(128 | e & 63);
        }, t.parseBoolean = function(e, r) {
            var s;
            return r == null && (r = !0), typeof e == "string" ? (s = e.toLowerCase(), !(!r && s === "no" || s === "0" || s === "false" || s === "")) : !!e;
        }, t.isNumeric = function(e) {
            return this.REGEX_SPACES.lastIndex = 0, typeof e == "number" || typeof e == "string" && !isNaN(e) && e.replace(this.REGEX_SPACES, "") !== "";
        }, t.stringToDate = function(e) {
            var r, s, n, o, a, l, u, p, d, c, m, h;
            if (!e?.length || (a = this.PATTERN_DATE.exec(e), !a)) return null;
            if (h = parseInt(a.year, 10), u = parseInt(a.month, 10) - 1, s = parseInt(a.day, 10), a.hour == null) return r = new Date(Date.UTC(h, u, s)), r;
            if (o = parseInt(a.hour, 10), l = parseInt(a.minute, 10), p = parseInt(a.second, 10), a.fraction != null) {
                for(n = a.fraction.slice(0, 3); n.length < 3;)n += "0";
                n = parseInt(n, 10);
            } else n = 0;
            return a.tz != null && (d = parseInt(a.tz_hour, 10), a.tz_minute != null ? c = parseInt(a.tz_minute, 10) : c = 0, m = (d * 60 + c) * 6e4, a.tz_sign === "-" && (m *= -1)), r = new Date(Date.UTC(h, u, s, o, l, p, n)), m && r.setTime(r.getTime() - m), r;
        }, t.strRepeat = function(e, r) {
            var s, n;
            for(n = "", s = 0; s < r;)n += e, s++;
            return n;
        }, t.getStringFromFile = function(e, r) {
            var s, n, o, a, l, u, p, d;
            if (r == null && (r = null), d = null, typeof window < "u" && window !== null) {
                if (window.XMLHttpRequest) d = new XMLHttpRequest;
                else if (window.ActiveXObject) for(u = [
                    "Msxml2.XMLHTTP.6.0",
                    "Msxml2.XMLHTTP.3.0",
                    "Msxml2.XMLHTTP",
                    "Microsoft.XMLHTTP"
                ], o = 0, a = u.length; o < a; o++){
                    l = u[o];
                    try {
                        d = new ActiveXObject(l);
                    } catch  {}
                }
            }
            return d != null ? r != null ? (d.onreadystatechange = function() {
                if (d.readyState === 4) return d.status === 200 || d.status === 0 ? r(d.responseText) : r(null);
            }, d.open("GET", e, !0), d.send(null)) : (d.open("GET", e, !1), d.send(null), d.status === 200 || d.status === 0 ? d.responseText : null) : (p = commonjsRequire, n = p("fs"), r != null ? n.readFile(e, function(c, m) {
                return r(c ? null : String(m));
            }) : (s = n.readFileSync(e), s != null ? String(s) : null));
        }, t;
    }();
    var Utils_1 = Utils$5, Pattern$3, Unescaper$1, Utils$4;
    Utils$4 = Utils_1;
    Pattern$3 = Pattern_1;
    Unescaper$1 = function() {
        function t() {}
        return t.PATTERN_ESCAPED_CHARACTER = new Pattern$3('\\\\([0abt	nvfre "\\/\\\\N_LP]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})'), t.unescapeSingleQuotedString = function(e) {
            return e.replace(/\'\'/g, "'");
        }, t.unescapeDoubleQuotedString = function(e) {
            return this._unescapeCallback == null && (this._unescapeCallback = function(r) {
                return function(s) {
                    return r.unescapeCharacter(s);
                };
            }(this)), this.PATTERN_ESCAPED_CHARACTER.replace(e, this._unescapeCallback);
        }, t.unescapeCharacter = function(e) {
            var r;
            switch(r = String.fromCharCode, e.charAt(1)){
                case "0":
                    return r(0);
                case "a":
                    return r(7);
                case "b":
                    return r(8);
                case "t":
                    return "	";
                case "	":
                    return "	";
                case "n":
                    return `
`;
                case "v":
                    return r(11);
                case "f":
                    return r(12);
                case "r":
                    return r(13);
                case "e":
                    return r(27);
                case " ":
                    return " ";
                case '"':
                    return '"';
                case "/":
                    return "/";
                case "\\":
                    return "\\";
                case "N":
                    return r(133);
                case "_":
                    return r(160);
                case "L":
                    return r(8232);
                case "P":
                    return r(8233);
                case "x":
                    return Utils$4.utf8chr(Utils$4.hexDec(e.substr(2, 2)));
                case "u":
                    return Utils$4.utf8chr(Utils$4.hexDec(e.substr(2, 4)));
                case "U":
                    return Utils$4.utf8chr(Utils$4.hexDec(e.substr(2, 8)));
                default:
                    return "";
            }
        }, t;
    }();
    var Unescaper_1 = Unescaper$1, Escaper$1, Pattern$2;
    Pattern$2 = Pattern_1;
    Escaper$1 = function() {
        var t;
        function e() {}
        return e.LIST_ESCAPEES = [
            "\\",
            "\\\\",
            '\\"',
            '"',
            "\0",
            "",
            "",
            "",
            "",
            "",
            "",
            "\x07",
            "\b",
            "	",
            `
`,
            "\v",
            "\f",
            "\r",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "\x1B",
            "",
            "",
            "",
            "",
            (t = String.fromCharCode)(133),
            t(160),
            t(8232),
            t(8233)
        ], e.LIST_ESCAPED = [
            "\\\\",
            '\\"',
            '\\"',
            '\\"',
            "\\0",
            "\\x01",
            "\\x02",
            "\\x03",
            "\\x04",
            "\\x05",
            "\\x06",
            "\\a",
            "\\b",
            "\\t",
            "\\n",
            "\\v",
            "\\f",
            "\\r",
            "\\x0e",
            "\\x0f",
            "\\x10",
            "\\x11",
            "\\x12",
            "\\x13",
            "\\x14",
            "\\x15",
            "\\x16",
            "\\x17",
            "\\x18",
            "\\x19",
            "\\x1a",
            "\\e",
            "\\x1c",
            "\\x1d",
            "\\x1e",
            "\\x1f",
            "\\N",
            "\\_",
            "\\L",
            "\\P"
        ], e.MAPPING_ESCAPEES_TO_ESCAPED = function() {
            var r, s, n, o;
            for(n = {}, r = s = 0, o = e.LIST_ESCAPEES.length; 0 <= o ? s < o : s > o; r = 0 <= o ? ++s : --s)n[e.LIST_ESCAPEES[r]] = e.LIST_ESCAPED[r];
            return n;
        }(), e.PATTERN_CHARACTERS_TO_ESCAPE = new Pattern$2("[\\x00-\\x1f]|Â|Â |â¨|â©"), e.PATTERN_MAPPING_ESCAPEES = new Pattern$2(e.LIST_ESCAPEES.join("|").split("\\").join("\\\\")), e.PATTERN_SINGLE_QUOTING = new Pattern$2("[\\s'\":{}[\\],&*#?]|^[-?|<>=!%@`]"), e.requiresDoubleQuoting = function(r) {
            return this.PATTERN_CHARACTERS_TO_ESCAPE.test(r);
        }, e.escapeWithDoubleQuotes = function(r) {
            var s;
            return s = this.PATTERN_MAPPING_ESCAPEES.replace(r, function(n) {
                return function(o) {
                    return n.MAPPING_ESCAPEES_TO_ESCAPED[o];
                };
            }(this)), '"' + s + '"';
        }, e.requiresSingleQuoting = function(r) {
            return this.PATTERN_SINGLE_QUOTING.test(r);
        }, e.escapeWithSingleQuotes = function(r) {
            return "'" + r.replace(/'/g, "''") + "'";
        }, e;
    }();
    var Escaper_1 = Escaper$1, ParseException$2, extend$3 = function(t, e) {
        for(var r in e)hasProp$2.call(e, r) && (t[r] = e[r]);
        function s() {
            this.constructor = t;
        }
        return s.prototype = e.prototype, t.prototype = new s, t.__super__ = e.prototype, t;
    }, hasProp$2 = {}.hasOwnProperty;
    ParseException$2 = function(t) {
        extend$3(e, t);
        function e(r, s, n) {
            this.message = r, this.parsedLine = s, this.snippet = n;
        }
        return e.prototype.toString = function() {
            return this.parsedLine != null && this.snippet != null ? "<ParseException> " + this.message + " (line " + this.parsedLine + ": '" + this.snippet + "')" : "<ParseException> " + this.message;
        }, e;
    }(Error);
    var ParseException_1 = ParseException$2, ParseMore$2, extend$2 = function(t, e) {
        for(var r in e)hasProp$1.call(e, r) && (t[r] = e[r]);
        function s() {
            this.constructor = t;
        }
        return s.prototype = e.prototype, t.prototype = new s, t.__super__ = e.prototype, t;
    }, hasProp$1 = {}.hasOwnProperty;
    ParseMore$2 = function(t) {
        extend$2(e, t);
        function e(r, s, n) {
            this.message = r, this.parsedLine = s, this.snippet = n;
        }
        return e.prototype.toString = function() {
            return this.parsedLine != null && this.snippet != null ? "<ParseMore> " + this.message + " (line " + this.parsedLine + ": '" + this.snippet + "')" : "<ParseMore> " + this.message;
        }, e;
    }(Error);
    var ParseMore_1 = ParseMore$2, extend$1 = function(t, e) {
        for(var r in e)hasProp.call(e, r) && (t[r] = e[r]);
        function s() {
            this.constructor = t;
        }
        return s.prototype = e.prototype, t.prototype = new s, t.__super__ = e.prototype, t;
    }, hasProp = {}.hasOwnProperty;
    (function(t) {
        extend$1(e, t);
        function e(r, s, n) {
            this.message = r, this.parsedLine = s, this.snippet = n;
        }
        return e.prototype.toString = function() {
            return this.parsedLine != null && this.snippet != null ? "<DumpException> " + this.message + " (line " + this.parsedLine + ": '" + this.snippet + "')" : "<DumpException> " + this.message;
        }, e;
    })(Error);
    var Escaper, Inline$2, ParseException$1, ParseMore$1, Pattern$1, Unescaper, Utils$3, indexOf = [].indexOf || function(t) {
        for(var e = 0, r = this.length; e < r; e++)if (e in this && this[e] === t) return e;
        return -1;
    };
    Pattern$1 = Pattern_1;
    Unescaper = Unescaper_1;
    Escaper = Escaper_1;
    Utils$3 = Utils_1;
    ParseException$1 = ParseException_1;
    ParseMore$1 = ParseMore_1;
    Inline$2 = function() {
        function t() {}
        return t.REGEX_QUOTED_STRING = `(?:"(?:[^"\\\\]*(?:\\\\.[^"\\\\]*)*)"|'(?:[^']*(?:''[^']*)*)')`, t.PATTERN_TRAILING_COMMENTS = new Pattern$1("^\\s*#.*$"), t.PATTERN_QUOTED_SCALAR = new Pattern$1("^" + t.REGEX_QUOTED_STRING), t.PATTERN_THOUSAND_NUMERIC_SCALAR = new Pattern$1("^(-|\\+)?[0-9,]+(\\.[0-9]+)?$"), t.PATTERN_SCALAR_BY_DELIMITERS = {}, t.settings = {}, t.configure = function(e, r) {
            e == null && (e = null), r == null && (r = null), this.settings.exceptionOnInvalidType = e, this.settings.objectDecoder = r;
        }, t.parse = function(e, r, s) {
            var n, o;
            if (r == null && (r = !1), s == null && (s = null), this.settings.exceptionOnInvalidType = r, this.settings.objectDecoder = s, e == null || (e = Utils$3.trim(e), e.length === 0)) return "";
            switch(n = {
                exceptionOnInvalidType: r,
                objectDecoder: s,
                i: 0
            }, e.charAt(0)){
                case "[":
                    o = this.parseSequence(e, n), ++n.i;
                    break;
                case "{":
                    o = this.parseMapping(e, n), ++n.i;
                    break;
                default:
                    o = this.parseScalar(e, null, [
                        '"',
                        "'"
                    ], n);
            }
            if (this.PATTERN_TRAILING_COMMENTS.replace(e.slice(n.i), "") !== "") throw new ParseException$1('Unexpected characters near "' + e.slice(n.i) + '".');
            return o;
        }, t.dump = function(e, r, s) {
            var n, o, a;
            return s == null && (s = null), e == null ? "null" : (a = typeof e, a === "object" ? e instanceof Date ? e.toISOString() : s != null && (o = s(e), typeof o == "string" || o != null) ? o : this.dumpObject(e) : a === "boolean" ? e ? "true" : "false" : Utils$3.isDigits(e) ? a === "string" ? "'" + e + "'" : String(parseInt(e)) : Utils$3.isNumeric(e) ? a === "string" ? "'" + e + "'" : String(parseFloat(e)) : a === "number" ? e === 1 / 0 ? ".Inf" : e === -1 / 0 ? "-.Inf" : isNaN(e) ? ".NaN" : e : Escaper.requiresDoubleQuoting(e) ? Escaper.escapeWithDoubleQuotes(e) : Escaper.requiresSingleQuoting(e) ? Escaper.escapeWithSingleQuotes(e) : e === "" ? '""' : Utils$3.PATTERN_DATE.test(e) || (n = e.toLowerCase()) === "null" || n === "~" || n === "true" || n === "false" ? "'" + e + "'" : e);
        }, t.dumpObject = function(e, r, s) {
            var n, o, a, l, u;
            if (e instanceof Array) {
                for(l = [], n = 0, a = e.length; n < a; n++)u = e[n], l.push(this.dump(u));
                return "[" + l.join(", ") + "]";
            } else {
                l = [];
                for(o in e)u = e[o], l.push(this.dump(o) + ": " + this.dump(u));
                return "{" + l.join(", ") + "}";
            }
        }, t.parseScalar = function(e, r, s, n, o) {
            var a, l, u, p, d, c, m, h, w;
            if (r == null && (r = null), s == null && (s = [
                '"',
                "'"
            ]), n == null && (n = null), o == null && (o = !0), n == null && (n = {
                exceptionOnInvalidType: this.settings.exceptionOnInvalidType,
                objectDecoder: this.settings.objectDecoder,
                i: 0
            }), a = n.i, c = e.charAt(a), indexOf.call(s, c) >= 0) {
                if (p = this.parseQuotedScalar(e, n), a = n.i, r != null && (w = Utils$3.ltrim(e.slice(a), " "), m = w.charAt(0), !(indexOf.call(r, m) >= 0))) throw new ParseException$1("Unexpected characters (" + e.slice(a) + ").");
            } else {
                if (!r) p = e.slice(a), a += p.length, h = p.indexOf(" #"), h !== -1 && (p = Utils$3.rtrim(p.slice(0, h)));
                else if (l = r.join("|"), d = this.PATTERN_SCALAR_BY_DELIMITERS[l], d == null && (d = new Pattern$1("^(.+?)(" + l + ")"), this.PATTERN_SCALAR_BY_DELIMITERS[l] = d), u = d.exec(e.slice(a))) p = u[1], a += p.length;
                else throw new ParseException$1("Malformed inline YAML string (" + e + ").");
                o && (p = this.evaluateScalar(p, n));
            }
            return n.i = a, p;
        }, t.parseQuotedScalar = function(e, r) {
            var s, n, o;
            if (s = r.i, !(n = this.PATTERN_QUOTED_SCALAR.exec(e.slice(s)))) throw new ParseMore$1("Malformed inline YAML string (" + e.slice(s) + ").");
            return o = n[0].substr(1, n[0].length - 2), e.charAt(s) === '"' ? o = Unescaper.unescapeDoubleQuotedString(o) : o = Unescaper.unescapeSingleQuotedString(o), s += n[0].length, r.i = s, o;
        }, t.parseSequence = function(e, r) {
            var s, n, o, a, l, u;
            for(a = [], o = e.length, s = r.i, s += 1; s < o;){
                switch(r.i = s, e.charAt(s)){
                    case "[":
                        a.push(this.parseSequence(e, r)), s = r.i;
                        break;
                    case "{":
                        a.push(this.parseMapping(e, r)), s = r.i;
                        break;
                    case "]":
                        return a;
                    case ",":
                    case " ":
                    case `
`:
                        break;
                    default:
                        if (n = (l = e.charAt(s)) === '"' || l === "'", u = this.parseScalar(e, [
                            ",",
                            "]"
                        ], [
                            '"',
                            "'"
                        ], r), s = r.i, !n && typeof u == "string" && (u.indexOf(": ") !== -1 || u.indexOf(`:
`) !== -1)) try {
                            u = this.parseMapping("{" + u + "}");
                        } catch  {}
                        a.push(u), --s;
                }
                ++s;
            }
            throw new ParseMore$1("Malformed inline YAML string " + e);
        }, t.parseMapping = function(e, r) {
            var s, n, o, a, l, u, p;
            for(l = {}, a = e.length, n = r.i, n += 1, u = !1; n < a;){
                switch(r.i = n, e.charAt(n)){
                    case " ":
                    case ",":
                    case `
`:
                        ++n, r.i = n, u = !0;
                        break;
                    case "}":
                        return l;
                }
                if (u) {
                    u = !1;
                    continue;
                }
                for(o = this.parseScalar(e, [
                    ":",
                    " ",
                    `
`
                ], [
                    '"',
                    "'"
                ], r, !1), n = r.i, s = !1; n < a;){
                    switch(r.i = n, e.charAt(n)){
                        case "[":
                            p = this.parseSequence(e, r), n = r.i, l[o] === void 0 && (l[o] = p), s = !0;
                            break;
                        case "{":
                            p = this.parseMapping(e, r), n = r.i, l[o] === void 0 && (l[o] = p), s = !0;
                            break;
                        case ":":
                        case " ":
                        case `
`:
                            break;
                        default:
                            p = this.parseScalar(e, [
                                ",",
                                "}"
                            ], [
                                '"',
                                "'"
                            ], r), n = r.i, l[o] === void 0 && (l[o] = p), s = !0, --n;
                    }
                    if (++n, s) break;
                }
            }
            throw new ParseMore$1("Malformed inline YAML string " + e);
        }, t.evaluateScalar = function(e, r) {
            var s, n, o, a, l, u, p, d, c, m, h;
            switch(e = Utils$3.trim(e), c = e.toLowerCase(), c){
                case "null":
                case "":
                case "~":
                    return null;
                case "true":
                    return !0;
                case "false":
                    return !1;
                case ".inf":
                    return 1 / 0;
                case ".nan":
                    return 0 / 0;
                case "-.inf":
                    return 1 / 0;
                default:
                    switch(a = c.charAt(0), a){
                        case "!":
                            switch(l = e.indexOf(" "), l === -1 ? u = c : u = c.slice(0, l), u){
                                case "!":
                                    return l !== -1 ? parseInt(this.parseScalar(e.slice(2))) : null;
                                case "!str":
                                    return Utils$3.ltrim(e.slice(4));
                                case "!!str":
                                    return Utils$3.ltrim(e.slice(5));
                                case "!!int":
                                    return parseInt(this.parseScalar(e.slice(5)));
                                case "!!bool":
                                    return Utils$3.parseBoolean(this.parseScalar(e.slice(6)), !1);
                                case "!!float":
                                    return parseFloat(this.parseScalar(e.slice(7)));
                                case "!!timestamp":
                                    return Utils$3.stringToDate(Utils$3.ltrim(e.slice(11)));
                                default:
                                    if (r == null && (r = {
                                        exceptionOnInvalidType: this.settings.exceptionOnInvalidType,
                                        objectDecoder: this.settings.objectDecoder,
                                        i: 0
                                    }), p = r.objectDecoder, o = r.exceptionOnInvalidType, p) return h = Utils$3.rtrim(e), l = h.indexOf(" "), l === -1 ? p(h, null) : (m = Utils$3.ltrim(h.slice(l + 1)), m.length > 0 || (m = null), p(h.slice(0, l), m));
                                    if (o) throw new ParseException$1("Custom object support when parsing a YAML file has been disabled.");
                                    return null;
                            }
                        case "0":
                            return e.slice(0, 2) === "0x" ? Utils$3.hexDec(e) : Utils$3.isDigits(e) ? Utils$3.octDec(e) : Utils$3.isNumeric(e) ? parseFloat(e) : e;
                        case "+":
                            return Utils$3.isDigits(e) ? (d = e, s = parseInt(d), d === String(s) ? s : d) : Utils$3.isNumeric(e) ? parseFloat(e) : this.PATTERN_THOUSAND_NUMERIC_SCALAR.test(e) ? parseFloat(e.replace(",", "")) : e;
                        case "-":
                            return Utils$3.isDigits(e.slice(1)) ? e.charAt(1) === "0" ? -Utils$3.octDec(e.slice(1)) : (d = e.slice(1), s = parseInt(d), d === String(s) ? -s : -d) : Utils$3.isNumeric(e) ? parseFloat(e) : this.PATTERN_THOUSAND_NUMERIC_SCALAR.test(e) ? parseFloat(e.replace(",", "")) : e;
                        default:
                            return (n = Utils$3.stringToDate(e)) ? n : Utils$3.isNumeric(e) ? parseFloat(e) : this.PATTERN_THOUSAND_NUMERIC_SCALAR.test(e) ? parseFloat(e.replace(",", "")) : e;
                    }
            }
        }, t;
    }();
    var Inline_1 = Inline$2, Inline$1, ParseException, ParseMore, Parser$1, Pattern, Utils$2;
    Inline$1 = Inline_1;
    Pattern = Pattern_1;
    Utils$2 = Utils_1;
    ParseException = ParseException_1;
    ParseMore = ParseMore_1;
    Parser$1 = function() {
        t.prototype.PATTERN_FOLDED_SCALAR_ALL = new Pattern("^(?:(?<type>![^\\|>]*)\\s+)?(?<separator>\\||>)(?<modifiers>\\+|\\-|\\d+|\\+\\d+|\\-\\d+|\\d+\\+|\\d+\\-)?(?<comments> +#.*)?$"), t.prototype.PATTERN_FOLDED_SCALAR_END = new Pattern("(?<separator>\\||>)(?<modifiers>\\+|\\-|\\d+|\\+\\d+|\\-\\d+|\\d+\\+|\\d+\\-)?(?<comments> +#.*)?$"), t.prototype.PATTERN_SEQUENCE_ITEM = new Pattern("^\\-((?<leadspaces>\\s+)(?<value>.+?))?\\s*$"), t.prototype.PATTERN_ANCHOR_VALUE = new Pattern("^&(?<ref>[^ ]+) *(?<value>.*)"), t.prototype.PATTERN_COMPACT_NOTATION = new Pattern("^(?<key>" + Inline$1.REGEX_QUOTED_STRING + `|[^ '"\\{\\[].*?) *\\:(\\s+(?<value>.+?))?\\s*$`), t.prototype.PATTERN_MAPPING_ITEM = new Pattern("^(?<key>" + Inline$1.REGEX_QUOTED_STRING + `|[^ '"\\[\\{].*?) *\\:(\\s+(?<value>.+?))?\\s*$`), t.prototype.PATTERN_DECIMAL = new Pattern("\\d+"), t.prototype.PATTERN_INDENT_SPACES = new Pattern("^ +"), t.prototype.PATTERN_TRAILING_LINES = new Pattern(`(
*)$`), t.prototype.PATTERN_YAML_HEADER = new Pattern(`^\\%YAML[: ][\\d\\.]+.*
`, "m"), t.prototype.PATTERN_LEADING_COMMENTS = new Pattern(`^(\\#.*?
)+`, "m"), t.prototype.PATTERN_DOCUMENT_MARKER_START = new Pattern(`^\\-\\-\\-.*?
`, "m"), t.prototype.PATTERN_DOCUMENT_MARKER_END = new Pattern("^\\.\\.\\.\\s*$", "m"), t.prototype.PATTERN_FOLDED_SCALAR_BY_INDENTATION = {}, t.prototype.CONTEXT_NONE = 0, t.prototype.CONTEXT_SEQUENCE = 1, t.prototype.CONTEXT_MAPPING = 2;
        function t(e) {
            this.offset = e ?? 0, this.lines = [], this.currentLineNb = -1, this.currentLine = "", this.refs = {};
        }
        return t.prototype.parse = function(e, r, s) {
            var n, o, a, l, u, p, d, c, m, h, w, y, T, E, f, _, x, A, g, b, v, F, I, U, O, B, S, P, N, M, D, $, k, L, j, R;
            for(r == null && (r = !1), s == null && (s = null), this.currentLineNb = -1, this.currentLine = "", this.lines = this.cleanup(e).split(`
`), p = null, u = this.CONTEXT_NONE, o = !1; this.moveToNextLine();)if (!this.isCurrentLineEmpty()) {
                if (this.currentLine[0] === "	") throw new ParseException("A YAML file cannot contain tabs as indentation.", this.getRealCurrentLineNb() + 1, this.currentLine);
                if (w = U = !1, R = this.PATTERN_SEQUENCE_ITEM.exec(this.currentLine)) {
                    if (this.CONTEXT_MAPPING === u) throw new ParseException("You cannot define a sequence item when in a mapping");
                    u = this.CONTEXT_SEQUENCE, p == null && (p = []), R.value != null && (I = this.PATTERN_ANCHOR_VALUE.exec(R.value)) && (w = I.ref, R.value = I.value), R.value == null || Utils$2.trim(R.value, " ") === "" || Utils$2.ltrim(R.value, " ").indexOf("#") === 0 ? this.currentLineNb < this.lines.length - 1 && !this.isNextLineUnIndentedCollection() ? (l = this.getRealCurrentLineNb() + 1, N = new t(l), N.refs = this.refs, p.push(N.parse(this.getNextEmbedBlock(null, !0), r, s))) : p.push(null) : (M = R.leadspaces) != null && M.length && (I = this.PATTERN_COMPACT_NOTATION.exec(R.value)) ? (l = this.getRealCurrentLineNb(), N = new t(l), N.refs = this.refs, a = R.value, h = this.getCurrentLineIndentation(), this.isNextLineIndented(!1) && (a += `
` + this.getNextEmbedBlock(h + R.leadspaces.length + 1, !0)), p.push(N.parse(a, r, s))) : p.push(this.parseValue(R.value, r, s));
                } else if ((R = this.PATTERN_MAPPING_ITEM.exec(this.currentLine)) && R.key.indexOf(" #") === -1) {
                    if (this.CONTEXT_SEQUENCE === u) throw new ParseException("You cannot define a mapping item when in a sequence");
                    u = this.CONTEXT_MAPPING, p == null && (p = {}), Inline$1.configure(r, s);
                    try {
                        E = Inline$1.parseScalar(R.key);
                    } catch (W) {
                        throw d = W, d.parsedLine = this.getRealCurrentLineNb() + 1, d.snippet = this.currentLine, d;
                    }
                    if (E === "<<") if (U = !0, o = !0, ((D = R.value) != null ? D.indexOf("*") : void 0) === 0) {
                        if (k = R.value.slice(1), this.refs[k] == null) throw new ParseException('Reference "' + k + '" does not exist.', this.getRealCurrentLineNb() + 1, this.currentLine);
                        if (L = this.refs[k], typeof L != "object") throw new ParseException("YAML merge keys used with a scalar value instead of an object.", this.getRealCurrentLineNb() + 1, this.currentLine);
                        if (L instanceof Array) for(m = y = 0, x = L.length; y < x; m = ++y)e = L[m], p[B = String(m)] == null && (p[B] = e);
                        else for(E in L)e = L[E], p[E] == null && (p[E] = e);
                    } else {
                        if (R.value != null && R.value !== "" ? e = R.value : e = this.getNextEmbedBlock(), l = this.getRealCurrentLineNb() + 1, N = new t(l), N.refs = this.refs, S = N.parse(e, r), typeof S != "object") throw new ParseException("YAML merge keys used with a scalar value instead of an object.", this.getRealCurrentLineNb() + 1, this.currentLine);
                        if (S instanceof Array) for(f = 0, A = S.length; f < A; f++){
                            if (P = S[f], typeof P != "object") throw new ParseException("Merge items must be objects.", this.getRealCurrentLineNb() + 1, P);
                            if (P instanceof Array) for(m = F = 0, g = P.length; F < g; m = ++F)e = P[m], T = String(m), p.hasOwnProperty(T) || (p[T] = e);
                            else for(E in P)e = P[E], p.hasOwnProperty(E) || (p[E] = e);
                        }
                        else for(E in S)e = S[E], p.hasOwnProperty(E) || (p[E] = e);
                    }
                    else R.value != null && (I = this.PATTERN_ANCHOR_VALUE.exec(R.value)) && (w = I.ref, R.value = I.value);
                    U || (R.value == null || Utils$2.trim(R.value, " ") === "" || Utils$2.ltrim(R.value, " ").indexOf("#") === 0 ? !this.isNextLineIndented() && !this.isNextLineUnIndentedCollection() ? (o || p[E] === void 0) && (p[E] = null) : (l = this.getRealCurrentLineNb() + 1, N = new t(l), N.refs = this.refs, j = N.parse(this.getNextEmbedBlock(), r, s), (o || p[E] === void 0) && (p[E] = j)) : (j = this.parseValue(R.value, r, s), (o || p[E] === void 0) && (p[E] = j)));
                } else {
                    if (v = this.lines.length, v === 1 || v === 2 && Utils$2.isEmpty(this.lines[1])) {
                        try {
                            e = Inline$1.parse(this.lines[0], r, s);
                        } catch (W) {
                            throw d = W, d.parsedLine = this.getRealCurrentLineNb() + 1, d.snippet = this.currentLine, d;
                        }
                        if (typeof e == "object") {
                            if (e instanceof Array) c = e[0];
                            else for(E in e){
                                c = e[E];
                                break;
                            }
                            if (typeof c == "string" && c.indexOf("*") === 0) {
                                for(p = [], O = 0, b = e.length; O < b; O++)n = e[O], p.push(this.refs[n.slice(1)]);
                                e = p;
                            }
                        }
                        return e;
                    } else if (($ = Utils$2.ltrim(e).charAt(0)) === "[" || $ === "{") try {
                        return Inline$1.parse(e, r, s);
                    } catch (W) {
                        throw d = W, d.parsedLine = this.getRealCurrentLineNb() + 1, d.snippet = this.currentLine, d;
                    }
                    throw new ParseException("Unable to parse.", this.getRealCurrentLineNb() + 1, this.currentLine);
                }
                if (w) if (p instanceof Array) this.refs[w] = p[p.length - 1];
                else {
                    _ = null;
                    for(E in p)_ = E;
                    this.refs[w] = p[_];
                }
            }
            return Utils$2.isEmpty(p) ? null : p;
        }, t.prototype.getRealCurrentLineNb = function() {
            return this.currentLineNb + this.offset;
        }, t.prototype.getCurrentLineIndentation = function() {
            return this.currentLine.length - Utils$2.ltrim(this.currentLine, " ").length;
        }, t.prototype.getNextEmbedBlock = function(e, r) {
            var s, n, o, a, l, u, p;
            if (e == null && (e = null), r == null && (r = !1), this.moveToNextLine(), e == null) {
                if (a = this.getCurrentLineIndentation(), p = this.isStringUnIndentedCollectionItem(this.currentLine), !this.isCurrentLineEmpty() && a === 0 && !p) throw new ParseException("Indentation problem.", this.getRealCurrentLineNb() + 1, this.currentLine);
            } else a = e;
            for(s = [
                this.currentLine.slice(a)
            ], r || (o = this.isStringUnIndentedCollectionItem(this.currentLine)), u = this.PATTERN_FOLDED_SCALAR_END, l = !u.test(this.currentLine); this.moveToNextLine();)if (n = this.getCurrentLineIndentation(), n === a && (l = !u.test(this.currentLine)), !(l && this.isCurrentLineComment())) {
                if (this.isCurrentLineBlank()) {
                    s.push(this.currentLine.slice(a));
                    continue;
                }
                if (o && !this.isStringUnIndentedCollectionItem(this.currentLine) && n === a) {
                    this.moveToPreviousLine();
                    break;
                }
                if (n >= a) s.push(this.currentLine.slice(a));
                else if (Utils$2.ltrim(this.currentLine).charAt(0) !== "#") if (n === 0) {
                    this.moveToPreviousLine();
                    break;
                } else throw new ParseException("Indentation problem.", this.getRealCurrentLineNb() + 1, this.currentLine);
            }
            return s.join(`
`);
        }, t.prototype.moveToNextLine = function() {
            return this.currentLineNb >= this.lines.length - 1 ? !1 : (this.currentLine = this.lines[++this.currentLineNb], !0);
        }, t.prototype.moveToPreviousLine = function() {
            this.currentLine = this.lines[--this.currentLineNb];
        }, t.prototype.parseValue = function(e, r, s) {
            var n, o, a, l, u, p, d, c;
            if (e.indexOf("*") === 0) {
                if (u = e.indexOf("#"), u !== -1 ? e = e.substr(1, u - 2) : e = e.slice(1), this.refs[e] === void 0) throw new ParseException('Reference "' + e + '" does not exist.', this.currentLine);
                return this.refs[e];
            }
            if (a = this.PATTERN_FOLDED_SCALAR_ALL.exec(e)) return l = (p = a.modifiers) != null ? p : "", o = Math.abs(parseInt(l)), isNaN(o) && (o = 0), c = this.parseFoldedScalar(a.separator, this.PATTERN_DECIMAL.replace(l, ""), o), a.type != null ? (Inline$1.configure(r, s), Inline$1.parseScalar(a.type + " " + c)) : c;
            if ((d = e.charAt(0)) === "[" || d === "{" || d === '"' || d === "'") for(;;)try {
                return Inline$1.parse(e, r, s);
            } catch (m) {
                if (n = m, n instanceof ParseMore && this.moveToNextLine()) e += `
` + Utils$2.trim(this.currentLine, " ");
                else throw n.parsedLine = this.getRealCurrentLineNb() + 1, n.snippet = this.currentLine, n;
            }
            else return this.isNextLineIndented() && (e += `
` + this.getNextEmbedBlock()), Inline$1.parse(e, r, s);
        }, t.prototype.parseFoldedScalar = function(e, r, s) {
            var n, o, a, l, u, p, d, c, m, h;
            if (r == null && (r = ""), s == null && (s = 0), d = this.moveToNextLine(), !d) return "";
            for(n = this.isCurrentLineBlank(), h = ""; d && n;)(d = this.moveToNextLine()) && (h += `
`, n = this.isCurrentLineBlank());
            if (s === 0 && (u = this.PATTERN_INDENT_SPACES.exec(this.currentLine)) && (s = u[0].length), s > 0) for(c = this.PATTERN_FOLDED_SCALAR_BY_INDENTATION[s], c == null && (c = new Pattern("^ {" + s + "}(.*)$"), t.prototype.PATTERN_FOLDED_SCALAR_BY_INDENTATION[s] = c); d && (n || (u = c.exec(this.currentLine)));)n ? h += this.currentLine.slice(s) : h += u[1], (d = this.moveToNextLine()) && (h += `
`, n = this.isCurrentLineBlank());
            else d && (h += `
`);
            if (d && this.moveToPreviousLine(), e === ">") {
                for(p = "", m = h.split(`
`), o = 0, a = m.length; o < a; o++)l = m[o], l.length === 0 || l.charAt(0) === " " ? p = Utils$2.rtrim(p, " ") + l + `
` : p += l + " ";
                h = p;
            }
            return r !== "+" && (h = Utils$2.rtrim(h)), r === "" ? h = this.PATTERN_TRAILING_LINES.replace(h, `
`) : r === "-" && (h = this.PATTERN_TRAILING_LINES.replace(h, "")), h;
        }, t.prototype.isNextLineIndented = function(e) {
            var r, s, n;
            if (e == null && (e = !0), s = this.getCurrentLineIndentation(), r = !this.moveToNextLine(), e) for(; !r && this.isCurrentLineEmpty();)r = !this.moveToNextLine();
            else for(; !r && this.isCurrentLineBlank();)r = !this.moveToNextLine();
            return r ? !1 : (n = !1, this.getCurrentLineIndentation() > s && (n = !0), this.moveToPreviousLine(), n);
        }, t.prototype.isCurrentLineEmpty = function() {
            var e;
            return e = Utils$2.trim(this.currentLine, " "), e.length === 0 || e.charAt(0) === "#";
        }, t.prototype.isCurrentLineBlank = function() {
            return Utils$2.trim(this.currentLine, " ") === "";
        }, t.prototype.isCurrentLineComment = function() {
            var e;
            return e = Utils$2.ltrim(this.currentLine, " "), e.charAt(0) === "#";
        }, t.prototype.cleanup = function(e) {
            var r, s, n, o, a, l, u, p, d, c, m, h, w, y;
            for(e.indexOf("\r") !== -1 && (e = e.split(`\r
`).join(`
`).split("\r").join(`
`)), r = 0, c = this.PATTERN_YAML_HEADER.replaceAll(e, ""), e = c[0], r = c[1], this.offset += r, m = this.PATTERN_LEADING_COMMENTS.replaceAll(e, "", 1), y = m[0], r = m[1], r === 1 && (this.offset += Utils$2.subStrCount(e, `
`) - Utils$2.subStrCount(y, `
`), e = y), h = this.PATTERN_DOCUMENT_MARKER_START.replaceAll(e, "", 1), y = h[0], r = h[1], r === 1 && (this.offset += Utils$2.subStrCount(e, `
`) - Utils$2.subStrCount(y, `
`), e = y, e = this.PATTERN_DOCUMENT_MARKER_END.replace(e, "")), d = e.split(`
`), w = -1, o = 0, l = d.length; o < l; o++)p = d[o], Utils$2.trim(p, " ").length !== 0 && (n = p.length - Utils$2.ltrim(p).length, (w === -1 || n < w) && (w = n));
            if (w > 0) {
                for(s = a = 0, u = d.length; a < u; s = ++a)p = d[s], d[s] = p.slice(w);
                e = d.join(`
`);
            }
            return e;
        }, t.prototype.isNextLineUnIndentedCollection = function(e) {
            var r, s;
            for(e == null && (e = null), e == null && (e = this.getCurrentLineIndentation()), r = this.moveToNextLine(); r && this.isCurrentLineEmpty();)r = this.moveToNextLine();
            return r === !1 ? !1 : (s = !1, this.getCurrentLineIndentation() === e && this.isStringUnIndentedCollectionItem(this.currentLine) && (s = !0), this.moveToPreviousLine(), s);
        }, t.prototype.isStringUnIndentedCollectionItem = function() {
            return this.currentLine === "-" || this.currentLine.slice(0, 2) === "- ";
        }, t;
    }();
    var Parser_1 = Parser$1, Dumper$1, Inline, Utils$1;
    Utils$1 = Utils_1;
    Inline = Inline_1;
    Dumper$1 = function() {
        function t() {}
        return t.indentation = 4, t.prototype.dump = function(e, r, s, n, o) {
            var a, l, u, p, d, c, m;
            if (r == null && (r = 0), s == null && (s = 0), n == null && (n = !1), o == null && (o = null), p = "", d = s ? Utils$1.strRepeat(" ", s) : "", r <= 0 || typeof e != "object" || e instanceof Date || Utils$1.isEmpty(e)) p += d + Inline.dump(e, n, o);
            else if (e instanceof Array) for(a = 0, u = e.length; a < u; a++)c = e[a], m = r - 1 <= 0 || typeof c != "object" || Utils$1.isEmpty(c), p += d + "-" + (m ? " " : `
`) + this.dump(c, r - 1, m ? 0 : s + this.indentation, n, o) + (m ? `
` : "");
            else for(l in e)c = e[l], m = r - 1 <= 0 || typeof c != "object" || Utils$1.isEmpty(c), p += d + Inline.dump(l, n, o) + ":" + (m ? " " : `
`) + this.dump(c, r - 1, m ? 0 : s + this.indentation, n, o) + (m ? `
` : "");
            return p;
        }, t;
    }();
    var Dumper_1 = Dumper$1, Dumper, Parser, Utils, Yaml;
    Parser = Parser_1;
    Dumper = Dumper_1;
    Utils = Utils_1;
    Yaml = function() {
        function t() {}
        return t.parse = function(e, r, s) {
            return r == null && (r = !1), s == null && (s = null), new Parser().parse(e, r, s);
        }, t.parseFile = function(e, r, s, n) {
            var o;
            return r == null && (r = null), s == null && (s = !1), n == null && (n = null), r != null ? Utils.getStringFromFile(e, function(a) {
                return function(l) {
                    var u;
                    u = null, l != null && (u = a.parse(l, s, n)), r(u);
                };
            }(this)) : (o = Utils.getStringFromFile(e), o != null ? this.parse(o, s, n) : null);
        }, t.dump = function(e, r, s, n, o) {
            var a;
            return r == null && (r = 2), s == null && (s = 4), n == null && (n = !1), o == null && (o = null), a = new Dumper, a.indentation = s, a.dump(e, r, 0, n, o);
        }, t.stringify = function(e, r, s, n, o) {
            return this.dump(e, r, s, n, o);
        }, t.load = function(e, r, s, n) {
            return this.parseFile(e, r, s, n);
        }, t;
    }();
    typeof window < "u" && window !== null && (window.YAML = Yaml);
    (typeof window > "u" || window === null) && (commonjsGlobal.YAML = Yaml);
    const object = {}, hasOwnProperty = object.hasOwnProperty, forOwn = (t, e)=>{
        for(const r in t)hasOwnProperty.call(t, r) && e(r, t[r]);
    }, extend = (t, e)=>(e && forOwn(e, (r, s)=>{
            t[r] = s;
        }), t), forEach = (t, e)=>{
        const r = t.length;
        let s = -1;
        for(; ++s < r;)e(t[s]);
    }, fourHexEscape = (t)=>"\\u" + ("0000" + t).slice(-4), hexadecimal = (t, e)=>{
        let r = t.toString(16);
        return e ? r : r.toUpperCase();
    }, toString = object.toString, isArray = Array.isArray, isBuffer = (t)=>typeof buffer.Buffer == "function" && buffer.Buffer.isBuffer(t), isObject = (t)=>toString.call(t) == "[object Object]", isString = (t)=>typeof t == "string" || toString.call(t) == "[object String]", isNumber = (t)=>typeof t == "number" || toString.call(t) == "[object Number]", isBigInt = (t)=>typeof t == "bigint", isFunction = (t)=>typeof t == "function", isMap = (t)=>toString.call(t) == "[object Map]", isSet = (t)=>toString.call(t) == "[object Set]", singleEscapes = {
        "\\": "\\\\",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "	": "\\t"
    }, regexSingleEscape = /[\\\b\f\n\r\t]/, regexDigit = /[0-9]/, regexWhitespace = /[\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/, escapeEverythingRegex = /([\uD800-\uDBFF][\uDC00-\uDFFF])|([\uD800-\uDFFF])|(['"`])|[^]/g, escapeNonAsciiRegex = /([\uD800-\uDBFF][\uDC00-\uDFFF])|([\uD800-\uDFFF])|(['"`])|[^ !#-&\(-\[\]-_a-~]/g, jsesc = (t, e)=>{
        const r = ()=>{
            p = u, ++e.indentLevel, u = e.indent.repeat(e.indentLevel);
        }, s = {
            escapeEverything: !1,
            minimal: !1,
            isScriptContext: !1,
            quotes: "single",
            wrap: !1,
            es6: !1,
            json: !1,
            compact: !0,
            lowercaseHex: !1,
            numbers: "decimal",
            indent: "	",
            indentLevel: 0,
            __inline1__: !1,
            __inline2__: !1
        }, n = e && e.json;
        n && (s.quotes = "double", s.wrap = !0), e = extend(s, e), e.quotes != "single" && e.quotes != "double" && e.quotes != "backtick" && (e.quotes = "single");
        const o = e.quotes == "double" ? '"' : e.quotes == "backtick" ? "`" : "'", a = e.compact, l = e.lowercaseHex;
        let u = e.indent.repeat(e.indentLevel), p = "";
        const d = e.__inline1__, c = e.__inline2__, m = a ? "" : `
`;
        let h, w = !0;
        const y = e.numbers == "binary", T = e.numbers == "octal", E = e.numbers == "decimal", f = e.numbers == "hexadecimal";
        if (n && t && isFunction(t.toJSON) && (t = t.toJSON()), !isString(t)) {
            if (isMap(t)) return t.size == 0 ? "new Map()" : (a || (e.__inline1__ = !0, e.__inline2__ = !1), "new Map(" + jsesc(Array.from(t), e) + ")");
            if (isSet(t)) return t.size == 0 ? "new Set()" : "new Set(" + jsesc(Array.from(t), e) + ")";
            if (isBuffer(t)) return t.length == 0 ? "Buffer.from([])" : "Buffer.from(" + jsesc(Array.from(t), e) + ")";
            if (isArray(t)) return h = [], e.wrap = !0, d && (e.__inline1__ = !1, e.__inline2__ = !0), c || r(), forEach(t, (x)=>{
                w = !1, c && (e.__inline2__ = !1), h.push((a || c ? "" : u) + jsesc(x, e));
            }), w ? "[]" : c ? "[" + h.join(", ") + "]" : "[" + m + h.join("," + m) + m + (a ? "" : p) + "]";
            if (isNumber(t) || isBigInt(t)) {
                if (n) return JSON.stringify(Number(t));
                let x;
                if (E) x = String(t);
                else if (f) {
                    let A = t.toString(16);
                    l || (A = A.toUpperCase()), x = "0x" + A;
                } else y ? x = "0b" + t.toString(2) : T && (x = "0o" + t.toString(8));
                return isBigInt(t) ? x + "n" : x;
            } else return isBigInt(t) ? n ? JSON.stringify(Number(t)) : t + "n" : isObject(t) ? (h = [], e.wrap = !0, r(), forOwn(t, (x, A)=>{
                w = !1, h.push((a ? "" : u) + jsesc(x, e) + ":" + (a ? "" : " ") + jsesc(A, e));
            }), w ? "{}" : "{" + m + h.join("," + m) + m + (a ? "" : p) + "}") : n ? JSON.stringify(t) || "null" : String(t);
        }
        const _ = e.escapeEverything ? escapeEverythingRegex : escapeNonAsciiRegex;
        return h = t.replace(_, (x, A, g, b, v, F)=>{
            if (A) {
                if (e.minimal) return A;
                const U = A.charCodeAt(0), O = A.charCodeAt(1);
                if (e.es6) {
                    const B = (U - 55296) * 1024 + O - 56320 + 65536;
                    return "\\u{" + hexadecimal(B, l) + "}";
                }
                return fourHexEscape(hexadecimal(U, l)) + fourHexEscape(hexadecimal(O, l));
            }
            if (g) return fourHexEscape(hexadecimal(g.charCodeAt(0), l));
            if (x == "\0" && !n && !regexDigit.test(F.charAt(v + 1))) return "\\0";
            if (b) return b == o || e.escapeEverything ? "\\" + b : b;
            if (regexSingleEscape.test(x)) return singleEscapes[x];
            if (e.minimal && !regexWhitespace.test(x)) return x;
            const I = hexadecimal(x.charCodeAt(0), l);
            return n || I.length > 2 ? fourHexEscape(I) : "\\x" + ("00" + I).slice(-2);
        }), o == "`" && (h = h.replace(/\$\{/g, "\\${")), e.isScriptContext && (h = h.replace(/<\/(script|style)/gi, "<\\/$1").replace(/<!--/g, n ? "\\u003C!--" : "\\x3C!--")), e.wrap && (h = o + h + o), h;
    };
    jsesc.version = "3.0.2";
    const javaScriptSupportedArgs = new Set([
        ...COMMON_SUPPORTED_ARGS,
        "upload-file",
        "form",
        "form-string",
        "digest",
        "no-digest",
        "next",
        "compressed"
    ]);
    [
        ...javaScriptSupportedArgs
    ];
    [
        "Accept-Charset",
        "Accept-Encoding",
        "Access-Control-Request-Headers",
        "Access-Control-Request-Method",
        "Connection",
        "Content-Length",
        "Cookie",
        "Cookie2",
        "Date",
        "DNT",
        "Expect",
        "Host",
        "Keep-Alive",
        "Origin",
        "Referer",
        "Set-Cookie",
        "TE",
        "Trailer",
        "Transfer-Encoding",
        "Upgrade",
        "Via"
    ].map((t)=>t.toLowerCase());
    const supportedArgs = new Set([
        ...COMMON_SUPPORTED_ARGS,
        "insecure",
        "no-insecure",
        "form",
        "form-string",
        "compressed",
        "location",
        "no-location",
        "location-trusted",
        "no-location-trusted",
        "max-redirs",
        "output",
        "include",
        "proxy",
        "max-time",
        "connect-timeout",
        "anyauth",
        "no-anyauth",
        "digest",
        "no-digest",
        "aws-sigv4",
        "negotiate",
        "no-negotiate",
        "delegation",
        "ntlm",
        "no-ntlm",
        "ntlm-wb",
        "no-ntlm-wb"
    ]);
    function getDataString(t) {
        if (!t.data) return {};
        const e = t.headers.getContentType();
        if (e === "application/json") try {
            return JSON.parse(t.data.toString());
        } catch  {}
        if (e === "application/x-www-form-urlencoded") {
            const [r, s] = parseQueryString(t.data);
            if (s) return Object.fromEntries(s.map((n)=>[
                    n[0].toString(),
                    Array.isArray(n[1]) ? n[1].map((o)=>o.toString()) : n[1].toString()
                ]));
            if (r) return Object.fromEntries(r.map((n)=>[
                    n[0].toString(),
                    n[1].toString()
                ]));
        }
        return t.data.toString();
    }
    function getFilesString(t) {
        if (!t.multipartUploads) return;
        const e = {
            files: {},
            data: {}
        };
        for (const r of t.multipartUploads)"contentFile" in r ? e.files[r.name.toString()] = r.contentFile.toString() : e.data[r.name.toString()] = r.content.toString();
        return {
            files: Object.keys(e.files).length ? e.files : void 0,
            data: Object.keys(e.data).length ? e.data : void 0
        };
    }
    function _toJsonObject(t, e = []) {
        const r = getFirst(t, e), s = r.urls[0], n = {
            url: (s.queryDict ? s.urlWithoutQueryList : s.url).toString().replace(/\/$/, ""),
            raw_url: s.url.toString(),
            method: s.method.toLowerCase().toString()
        };
        if (r.cookies && (n.cookies = Object.fromEntries(r.cookies.map((o)=>[
                o[0].toString(),
                o[1].toString()
            ]))), r.headers.length) {
            const o = r.headers.headers.filter((a)=>a[1] !== null).map((a)=>[
                    a[0].toString(),
                    a[1].toString()
                ]);
            n.headers = Object.fromEntries(o);
        }
        if (s.queryDict && (n.queries = Object.fromEntries(s.queryDict.map((o)=>[
                o[0].toString(),
                Array.isArray(o[1]) ? o[1].map((a)=>a.toString()) : o[1].toString()
            ]))), r.data ? n.data = getDataString(r) : r.multipartUploads && Object.assign(n, getFilesString(r)), r.compressed && (n.compressed = !0), r.insecure && (n.insecure = !1), r.include && (n.include = !0), s.auth) {
            const [o, a] = s.auth;
            n.auth = {
                user: o.toString(),
                password: a.toString()
            }, r.authType && (n.auth_type = r.authType);
        }
        return r.awsSigV4 && (n.aws_sigv4 = r.awsSigV4.toString()), r.delegation && (n.delegation = r.delegation.toString()), Object.prototype.hasOwnProperty.call(r, "followRedirects") && (n.follow_redirects = r.followRedirects, r.maxRedirects && (n.max_redirects = parseInt(r.maxRedirects.toString(), 10))), r.proxy && (n.proxy = r.proxy.toString()), r.timeout && (n.timeout = parseFloat(r.timeout.toString())), r.connectTimeout && (n.connect_timeout = parseFloat(r.connectTimeout.toString())), s.output && (n.output = s.output.toString()), n;
    }
    function _toJsonString(t, e = []) {
        const r = _toJsonObject(t, e);
        return JSON.stringify(Object.keys(r).length ? r : "{}", null, 4) + `
`;
    }
    function toJsonStringWarn(t, e = []) {
        const r = parse(t, supportedArgs, e);
        return [
            _toJsonString(r, e),
            e
        ];
    }
    toJsonString = function(t) {
        return toJsonStringWarn(t)[0];
    };
    [
        "Content-Length",
        "Authorization",
        "Connection",
        "Host",
        "Proxy-Authenticate",
        "Proxy-Authorization",
        "WWW-Authenticate"
    ].map((t)=>t.toLowerCase());
});
export { toJsonString as t, __tla };
