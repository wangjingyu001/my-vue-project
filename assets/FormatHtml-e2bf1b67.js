import { s as Ie, u as P, v as be, x as i, L as ye, y as Le, z as Fe, A as Pe, B as $e, F as Ke, G as we, H as He, I as Xe, J as M, K as Je, N as et, E as y, M as tt, O as at, _ as rt, b as lt, C as ot, d as F, e as K, q as H, r as J, o as nt, h as Ot, w as R, m as ee, n as te, __tla as __tla_0 } from "./index-43347b94.js";
import { t as st, a as it, b as ut, c as B, j as ct } from "./index-ba3e05d1.js";
let za;
let __tla = Promise.all([
    (()=>{
        try {
            return __tla_0;
        } catch  {}
    })()
]).then(async ()=>{
    const dt = 54, pt = 1, mt = 55, ft = 2, St = 56, gt = 3, ae = 4, ht = 5, V = 6, Te = 7, xe = 8, ve = 9, _e = 10, Qt = 11, bt = 12, yt = 13, Y = 57, Pt = 14, re = 58, ke = 20, $t = 22, Ve = 23, wt = 24, N = 26, Ce = 27, Xt = 28, Tt = 31, xt = 34, vt = 36, _t = 37, kt = 0, Vt = 1, Ct = {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        command: !0,
        embed: !0,
        frame: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0,
        menuitem: !0
    }, Wt = {
        dd: !0,
        li: !0,
        optgroup: !0,
        option: !0,
        p: !0,
        rp: !0,
        rt: !0,
        tbody: !0,
        td: !0,
        tfoot: !0,
        th: !0,
        tr: !0
    }, le = {
        dd: {
            dd: !0,
            dt: !0
        },
        dt: {
            dd: !0,
            dt: !0
        },
        li: {
            li: !0
        },
        option: {
            option: !0,
            optgroup: !0
        },
        optgroup: {
            optgroup: !0
        },
        p: {
            address: !0,
            article: !0,
            aside: !0,
            blockquote: !0,
            dir: !0,
            div: !0,
            dl: !0,
            fieldset: !0,
            footer: !0,
            form: !0,
            h1: !0,
            h2: !0,
            h3: !0,
            h4: !0,
            h5: !0,
            h6: !0,
            header: !0,
            hgroup: !0,
            hr: !0,
            menu: !0,
            nav: !0,
            ol: !0,
            p: !0,
            pre: !0,
            section: !0,
            table: !0,
            ul: !0
        },
        rp: {
            rp: !0,
            rt: !0
        },
        rt: {
            rp: !0,
            rt: !0
        },
        tbody: {
            tbody: !0,
            tfoot: !0
        },
        td: {
            td: !0,
            th: !0
        },
        tfoot: {
            tbody: !0
        },
        th: {
            td: !0,
            th: !0
        },
        thead: {
            tbody: !0,
            tfoot: !0
        },
        tr: {
            tr: !0
        }
    };
    function qt(e) {
        return e == 45 || e == 46 || e == 58 || e >= 65 && e <= 90 || e == 95 || e >= 97 && e <= 122 || e >= 161;
    }
    function We(e) {
        return e == 9 || e == 10 || e == 13 || e == 32;
    }
    let oe = null, ne = null, Oe = 0;
    function D(e, a) {
        let l = e.pos + a;
        if (Oe == l && ne == e) return oe;
        let r = e.peek(a);
        for(; We(r);)r = e.peek(++a);
        let t = "";
        for(; qt(r);)t += String.fromCharCode(r), r = e.peek(++a);
        return ne = e, Oe = l, oe = t ? t.toLowerCase() : r == Rt || r == Yt ? void 0 : null;
    }
    const qe = 60, C = 62, j = 47, Rt = 63, Yt = 33, zt = 45;
    function se(e, a) {
        this.name = e, this.parent = a;
    }
    const Zt = [
        V,
        _e,
        Te,
        xe,
        ve
    ], Et = new Ie({
        start: null,
        shift (e, a, l, r) {
            return Zt.indexOf(a) > -1 ? new se(D(r, 1) || "", e) : e;
        },
        reduce (e, a) {
            return a == ke && e ? e.parent : e;
        },
        reuse (e, a, l, r) {
            let t = a.type.id;
            return t == V || t == vt ? new se(D(r, 1) || "", e) : e;
        },
        strict: !1
    }), At = new P((e, a)=>{
        if (e.next != qe) {
            e.next < 0 && a.context && e.acceptToken(Y);
            return;
        }
        e.advance();
        let l = e.next == j;
        l && e.advance();
        let r = D(e, 0);
        if (r === void 0) return;
        if (!r) return e.acceptToken(l ? Pt : V);
        let t = a.context ? a.context.name : null;
        if (l) {
            if (r == t) return e.acceptToken(Qt);
            if (t && Wt[t]) return e.acceptToken(Y, -2);
            if (a.dialectEnabled(kt)) return e.acceptToken(bt);
            for(let o = a.context; o; o = o.parent)if (o.name == r) return;
            e.acceptToken(yt);
        } else {
            if (r == "script") return e.acceptToken(Te);
            if (r == "style") return e.acceptToken(xe);
            if (r == "textarea") return e.acceptToken(ve);
            if (Ct.hasOwnProperty(r)) return e.acceptToken(_e);
            t && le[t] && le[t][r] ? e.acceptToken(Y, -1) : e.acceptToken(V);
        }
    }, {
        contextual: !0
    }), Ut = new P((e)=>{
        for(let a = 0, l = 0;; l++){
            if (e.next < 0) {
                l && e.acceptToken(re);
                break;
            }
            if (e.next == zt) a++;
            else if (e.next == C && a >= 2) {
                l >= 3 && e.acceptToken(re, -2);
                break;
            } else a = 0;
            e.advance();
        }
    });
    function Gt(e) {
        for(; e; e = e.parent)if (e.name == "svg" || e.name == "math") return !0;
        return !1;
    }
    const Nt = new P((e, a)=>{
        if (e.next == j && e.peek(1) == C) {
            let l = a.dialectEnabled(Vt) || Gt(a.context);
            e.acceptToken(l ? ht : ae, 2);
        } else e.next == C && e.acceptToken(ae, 1);
    });
    function I(e, a, l) {
        let r = 2 + e.length;
        return new P((t)=>{
            for(let o = 0, n = 0, s = 0;; s++){
                if (t.next < 0) {
                    s && t.acceptToken(a);
                    break;
                }
                if (o == 0 && t.next == qe || o == 1 && t.next == j || o >= 2 && o < r && t.next == e.charCodeAt(o - 2)) o++, n++;
                else if ((o == 2 || o == r) && We(t.next)) n++;
                else if (o == r && t.next == C) {
                    s > n ? t.acceptToken(a, -n) : t.acceptToken(l, -(n - 2));
                    break;
                } else if ((t.next == 10 || t.next == 13) && s) {
                    t.acceptToken(a, 1);
                    break;
                } else o = n = 0;
                t.advance();
            }
        });
    }
    const Dt = I("script", dt, pt), Mt = I("style", mt, ft), Bt = I("textarea", St, gt), jt = be({
        "Text RawText": i.content,
        "StartTag StartCloseTag SelfClosingEndTag EndTag": i.angleBracket,
        TagName: i.tagName,
        "MismatchedCloseTag/TagName": [
            i.tagName,
            i.invalid
        ],
        AttributeName: i.attributeName,
        "AttributeValue UnquotedAttributeValue": i.attributeValue,
        Is: i.definitionOperator,
        "EntityReference CharacterReference": i.character,
        Comment: i.blockComment,
        ProcessingInst: i.processingInstruction,
        DoctypeDecl: i.documentMeta
    }), It = ye.deserialize({
        version: 14,
        states: ",xOVO!rOOO!WQ#tO'#CqO!]Q#tO'#CzO!bQ#tO'#C}O!gQ#tO'#DQO!lQ#tO'#DSO!qOaO'#CpO!|ObO'#CpO#XOdO'#CpO$eO!rO'#CpOOO`'#Cp'#CpO$lO$fO'#DTO$tQ#tO'#DVO$yQ#tO'#DWOOO`'#Dk'#DkOOO`'#DY'#DYQVO!rOOO%OQ&rO,59]O%ZQ&rO,59fO%fQ&rO,59iO%qQ&rO,59lO%|Q&rO,59nOOOa'#D^'#D^O&XOaO'#CxO&dOaO,59[OOOb'#D_'#D_O&lObO'#C{O&wObO,59[OOOd'#D`'#D`O'POdO'#DOO'[OdO,59[OOO`'#Da'#DaO'dO!rO,59[O'kQ#tO'#DROOO`,59[,59[OOOp'#Db'#DbO'pO$fO,59oOOO`,59o,59oO'xQ#|O,59qO'}Q#|O,59rOOO`-E7W-E7WO(SQ&rO'#CsOOQW'#DZ'#DZO(bQ&rO1G.wOOOa1G.w1G.wOOO`1G/Y1G/YO(mQ&rO1G/QOOOb1G/Q1G/QO(xQ&rO1G/TOOOd1G/T1G/TO)TQ&rO1G/WOOO`1G/W1G/WO)`Q&rO1G/YOOOa-E7[-E7[O)kQ#tO'#CyOOO`1G.v1G.vOOOb-E7]-E7]O)pQ#tO'#C|OOOd-E7^-E7^O)uQ#tO'#DPOOO`-E7_-E7_O)zQ#|O,59mOOOp-E7`-E7`OOO`1G/Z1G/ZOOO`1G/]1G/]OOO`1G/^1G/^O*PQ,UO,59_OOQW-E7X-E7XOOOa7+$c7+$cOOO`7+$t7+$tOOOb7+$l7+$lOOOd7+$o7+$oOOO`7+$r7+$rO*[Q#|O,59eO*aQ#|O,59hO*fQ#|O,59kOOO`1G/X1G/XO*kO7[O'#CvO*|OMhO'#CvOOQW1G.y1G.yOOO`1G/P1G/POOO`1G/S1G/SOOO`1G/V1G/VOOOO'#D['#D[O+_O7[O,59bOOQW,59b,59bOOOO'#D]'#D]O+pOMhO,59bOOOO-E7Y-E7YOOQW1G.|1G.|OOOO-E7Z-E7Z",
        stateData: ",]~O!^OS~OUSOVPOWQOXROYTO[]O][O^^O`^Oa^Ob^Oc^Ox^O{_O!dZO~OfaO~OfbO~OfcO~OfdO~OfeO~O!WfOPlP!ZlP~O!XiOQoP!ZoP~O!YlORrP!ZrP~OUSOVPOWQOXROYTOZqO[]O][O^^O`^Oa^Ob^Oc^Ox^O!dZO~O!ZrO~P#dO![sO!euO~OfvO~OfwO~OS|OT}OhyO~OS!POT}OhyO~OS!ROT}OhyO~OS!TOT}OhyO~OS}OT}OhyO~O!WfOPlX!ZlX~OP!WO!Z!XO~O!XiOQoX!ZoX~OQ!ZO!Z!XO~O!YlORrX!ZrX~OR!]O!Z!XO~O!Z!XO~P#dOf!_O~O![sO!e!aO~OS!bO~OS!cO~Oi!dOSgXTgXhgX~OS!fOT!gOhyO~OS!hOT!gOhyO~OS!iOT!gOhyO~OS!jOT!gOhyO~OS!gOT!gOhyO~Of!kO~Of!lO~Of!mO~OS!nO~Ok!qO!`!oO!b!pO~OS!rO~OS!sO~OS!tO~Oa!uOb!uOc!uO!`!wO!a!uO~Oa!xOb!xOc!xO!b!wO!c!xO~Oa!uOb!uOc!uO!`!{O!a!uO~Oa!xOb!xOc!xO!b!{O!c!xO~OT~bac!dx{!d~",
        goto: "%p!`PPPPPPPPPPPPPPPPPPPP!a!gP!mPP!yP!|#P#S#Y#]#`#f#i#l#r#x!aP!a!aP$O$U$l$r$x%O%U%[%bPPPPPPPP%hX^OX`pXUOX`pezabcde{!O!Q!S!UR!q!dRhUR!XhXVOX`pRkVR!XkXWOX`pRnWR!XnXXOX`pQrXR!XpXYOX`pQ`ORx`Q{aQ!ObQ!QcQ!SdQ!UeZ!e{!O!Q!S!UQ!v!oR!z!vQ!y!pR!|!yQgUR!VgQjVR!YjQmWR![mQpXR!^pQtZR!`tS_O`ToXp",
        nodeNames: "⚠ StartCloseTag StartCloseTag StartCloseTag EndTag SelfClosingEndTag StartTag StartTag StartTag StartTag StartTag StartCloseTag StartCloseTag StartCloseTag IncompleteCloseTag Document Text EntityReference CharacterReference InvalidEntity Element OpenTag TagName Attribute AttributeName Is AttributeValue UnquotedAttributeValue ScriptText CloseTag OpenTag StyleText CloseTag OpenTag TextareaText CloseTag OpenTag CloseTag SelfClosingTag Comment ProcessingInst MismatchedCloseTag CloseTag DoctypeDecl",
        maxTerm: 67,
        context: Et,
        nodeProps: [
            [
                "closedBy",
                -10,
                1,
                2,
                3,
                7,
                8,
                9,
                10,
                11,
                12,
                13,
                "EndTag",
                6,
                "EndTag SelfClosingEndTag",
                -4,
                21,
                30,
                33,
                36,
                "CloseTag"
            ],
            [
                "openedBy",
                4,
                "StartTag StartCloseTag",
                5,
                "StartTag",
                -4,
                29,
                32,
                35,
                37,
                "OpenTag"
            ],
            [
                "group",
                -9,
                14,
                17,
                18,
                19,
                20,
                39,
                40,
                41,
                42,
                "Entity",
                16,
                "Entity TextContent",
                -3,
                28,
                31,
                34,
                "TextContent Entity"
            ],
            [
                "isolate",
                -11,
                21,
                29,
                30,
                32,
                33,
                35,
                36,
                37,
                38,
                41,
                42,
                "ltr",
                -3,
                26,
                27,
                39,
                ""
            ]
        ],
        propSources: [
            jt
        ],
        skippedNodes: [
            0
        ],
        repeatNodeCount: 9,
        tokenData: "!<p!aR!YOX$qXY,QYZ,QZ[$q[]&X]^,Q^p$qpq,Qqr-_rs3_sv-_vw3}wxHYx}-_}!OH{!O!P-_!P!Q$q!Q![-_![!]Mz!]!^-_!^!_!$S!_!`!;x!`!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4U-_4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!Z$|c`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr$qrs&}sv$qvw+Pwx(tx!^$q!^!_*V!_!a&X!a#S$q#S#T&X#T;'S$q;'S;=`+z<%lO$q!R&bX`P!a`!cpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&Xq'UV`P!cpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}P'pT`POv'kw!^'k!_;'S'k;'S;=`(P<%lO'kP(SP;=`<%l'kp([S!cpOv(Vx;'S(V;'S;=`(h<%lO(Vp(kP;=`<%l(Vq(qP;=`<%l&}a({W`P!a`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t`)jT!a`Or)esv)ew;'S)e;'S;=`)y<%lO)e`)|P;=`<%l)ea*SP;=`<%l(t!Q*^V!a`!cpOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!Q*vP;=`<%l*V!R*|P;=`<%l&XW+UYkWOX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+PW+wP;=`<%l+P!Z+}P;=`<%l$q!a,]``P!a`!cp!^^OX&XXY,QYZ,QZ]&X]^,Q^p&Xpq,Qqr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!_-ljhS`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q[/ebhSkWOX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+PS0rXhSqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0mS1bP;=`<%l0m[1hP;=`<%l/^!V1vchS`P!a`!cpOq&Xqr1krs&}sv1kvw0mwx(tx!P1k!P!Q&X!Q!^1k!^!_*V!_!a&X!a#s1k#s$f&X$f;'S1k;'S;=`3R<%l?Ah1k?Ah?BY&X?BY?Mn1k?MnO&X!V3UP;=`<%l1k!_3[P;=`<%l-_!Z3hV!`h`P!cpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}!_4WihSkWc!ROX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst>]tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^/^!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!Z5zbkWOX5uXZ7SZ[5u[^7S^p5uqr5urs7Sst+Ptw5uwx7Sx!]5u!]!^7w!^!a7S!a#S5u#S#T7S#T;'S5u;'S;=`8n<%lO5u!R7VVOp7Sqs7St!]7S!]!^7l!^;'S7S;'S;=`7q<%lO7S!R7qOa!R!R7tP;=`<%l7S!Z8OYkWa!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!Z8qP;=`<%l5u!_8{ihSkWOX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst/^tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^:j!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!_:sbhSkWa!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!V<QchSOp7Sqr;{rs7Sst0mtw;{wx7Sx!P;{!P!Q7S!Q!];{!]!^=]!^!a7S!a#s;{#s$f7S$f;'S;{;'S;=`>P<%l?Ah;{?Ah?BY7S?BY?Mn;{?MnO7S!V=dXhSa!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!V>SP;=`<%l;{!_>YP;=`<%l8t!_>dhhSkWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^/^!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!Z@TakWOX@OXZAYZ[@O[^AY^p@Oqr@OrsAYsw@OwxAYx!]@O!]!^Az!^!aAY!a#S@O#S#TAY#T;'S@O;'S;=`Bq<%lO@O!RA]UOpAYq!]AY!]!^Ao!^;'SAY;'S;=`At<%lOAY!RAtOb!R!RAwP;=`<%lAY!ZBRYkWb!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!ZBtP;=`<%l@O!_COhhSkWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^Dj!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!_DsbhSkWb!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!VFQbhSOpAYqrE{rsAYswE{wxAYx!PE{!P!QAY!Q!]E{!]!^GY!^!aAY!a#sE{#s$fAY$f;'SE{;'S;=`G|<%l?AhE{?Ah?BYAY?BY?MnE{?MnOAY!VGaXhSb!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!VHPP;=`<%lE{!_HVP;=`<%lBw!ZHcW!bx`P!a`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t!aIYlhS`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OKQ!O!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!aK_khS`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!`&X!`!aMS!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!TM_X`P!a`!cp!eQOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!aNZ!ZhSfQ`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OMz!O!PMz!P!Q$q!Q![Mz![!]Mz!]!^-_!^!_*V!_!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f$}-_$}%OMz%O%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4UMz4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Je-_$Je$JgMz$Jg$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!a!$PP;=`<%lMz!R!$ZY!a`!cpOq*Vqr!$yrs(Vsv*Vwx)ex!a*V!a!b!4t!b;'S*V;'S;=`*s<%lO*V!R!%Q]!a`!cpOr*Vrs(Vsv*Vwx)ex}*V}!O!%y!O!f*V!f!g!']!g#W*V#W#X!0`#X;'S*V;'S;=`*s<%lO*V!R!&QX!a`!cpOr*Vrs(Vsv*Vwx)ex}*V}!O!&m!O;'S*V;'S;=`*s<%lO*V!R!&vV!a`!cp!dPOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!'dX!a`!cpOr*Vrs(Vsv*Vwx)ex!q*V!q!r!(P!r;'S*V;'S;=`*s<%lO*V!R!(WX!a`!cpOr*Vrs(Vsv*Vwx)ex!e*V!e!f!(s!f;'S*V;'S;=`*s<%lO*V!R!(zX!a`!cpOr*Vrs(Vsv*Vwx)ex!v*V!v!w!)g!w;'S*V;'S;=`*s<%lO*V!R!)nX!a`!cpOr*Vrs(Vsv*Vwx)ex!{*V!{!|!*Z!|;'S*V;'S;=`*s<%lO*V!R!*bX!a`!cpOr*Vrs(Vsv*Vwx)ex!r*V!r!s!*}!s;'S*V;'S;=`*s<%lO*V!R!+UX!a`!cpOr*Vrs(Vsv*Vwx)ex!g*V!g!h!+q!h;'S*V;'S;=`*s<%lO*V!R!+xY!a`!cpOr!+qrs!,hsv!+qvw!-Swx!.[x!`!+q!`!a!/j!a;'S!+q;'S;=`!0Y<%lO!+qq!,mV!cpOv!,hvx!-Sx!`!,h!`!a!-q!a;'S!,h;'S;=`!.U<%lO!,hP!-VTO!`!-S!`!a!-f!a;'S!-S;'S;=`!-k<%lO!-SP!-kO{PP!-nP;=`<%l!-Sq!-xS!cp{POv(Vx;'S(V;'S;=`(h<%lO(Vq!.XP;=`<%l!,ha!.aX!a`Or!.[rs!-Ssv!.[vw!-Sw!`!.[!`!a!.|!a;'S!.[;'S;=`!/d<%lO!.[a!/TT!a`{POr)esv)ew;'S)e;'S;=`)y<%lO)ea!/gP;=`<%l!.[!R!/sV!a`!cp{POr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!0]P;=`<%l!+q!R!0gX!a`!cpOr*Vrs(Vsv*Vwx)ex#c*V#c#d!1S#d;'S*V;'S;=`*s<%lO*V!R!1ZX!a`!cpOr*Vrs(Vsv*Vwx)ex#V*V#V#W!1v#W;'S*V;'S;=`*s<%lO*V!R!1}X!a`!cpOr*Vrs(Vsv*Vwx)ex#h*V#h#i!2j#i;'S*V;'S;=`*s<%lO*V!R!2qX!a`!cpOr*Vrs(Vsv*Vwx)ex#m*V#m#n!3^#n;'S*V;'S;=`*s<%lO*V!R!3eX!a`!cpOr*Vrs(Vsv*Vwx)ex#d*V#d#e!4Q#e;'S*V;'S;=`*s<%lO*V!R!4XX!a`!cpOr*Vrs(Vsv*Vwx)ex#X*V#X#Y!+q#Y;'S*V;'S;=`*s<%lO*V!R!4{Y!a`!cpOr!4trs!5ksv!4tvw!6Vwx!8]x!a!4t!a!b!:]!b;'S!4t;'S;=`!;r<%lO!4tq!5pV!cpOv!5kvx!6Vx!a!5k!a!b!7W!b;'S!5k;'S;=`!8V<%lO!5kP!6YTO!a!6V!a!b!6i!b;'S!6V;'S;=`!7Q<%lO!6VP!6lTO!`!6V!`!a!6{!a;'S!6V;'S;=`!7Q<%lO!6VP!7QOxPP!7TP;=`<%l!6Vq!7]V!cpOv!5kvx!6Vx!`!5k!`!a!7r!a;'S!5k;'S;=`!8V<%lO!5kq!7yS!cpxPOv(Vx;'S(V;'S;=`(h<%lO(Vq!8YP;=`<%l!5ka!8bX!a`Or!8]rs!6Vsv!8]vw!6Vw!a!8]!a!b!8}!b;'S!8];'S;=`!:V<%lO!8]a!9SX!a`Or!8]rs!6Vsv!8]vw!6Vw!`!8]!`!a!9o!a;'S!8];'S;=`!:V<%lO!8]a!9vT!a`xPOr)esv)ew;'S)e;'S;=`)y<%lO)ea!:YP;=`<%l!8]!R!:dY!a`!cpOr!4trs!5ksv!4tvw!6Vwx!8]x!`!4t!`!a!;S!a;'S!4t;'S;=`!;r<%lO!4t!R!;]V!a`!cpxPOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!;uP;=`<%l!4t!V!<TXiS`P!a`!cpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X",
        tokenizers: [
            Dt,
            Mt,
            Bt,
            Nt,
            At,
            Ut,
            0,
            1,
            2,
            3,
            4,
            5
        ],
        topRules: {
            Document: [
                0,
                15
            ]
        },
        dialects: {
            noMatch: 0,
            selfClosing: 509
        },
        tokenPrec: 511
    });
    function Re(e, a) {
        let l = Object.create(null);
        for (let r of e.getChildren(Ve)){
            let t = r.getChild(wt), o = r.getChild(N) || r.getChild(Ce);
            t && (l[a.read(t.from, t.to)] = o ? o.type.id == N ? a.read(o.from + 1, o.to - 1) : a.read(o.from, o.to) : "");
        }
        return l;
    }
    function ie(e, a) {
        let l = e.getChild($t);
        return l ? a.read(l.from, l.to) : " ";
    }
    function z(e, a, l) {
        let r;
        for (let t of l)if (!t.attrs || t.attrs(r || (r = Re(e.node.parent.firstChild, a)))) return {
            parser: t.parser
        };
        return null;
    }
    function Ye(e = [], a = []) {
        let l = [], r = [], t = [], o = [];
        for (let s of e)(s.tag == "script" ? l : s.tag == "style" ? r : s.tag == "textarea" ? t : o).push(s);
        let n = a.length ? Object.create(null) : null;
        for (let s of a)(n[s.name] || (n[s.name] = [])).push(s);
        return Le((s, u)=>{
            let S = s.type.id;
            if (S == Xt) return z(s, u, l);
            if (S == Tt) return z(s, u, r);
            if (S == xt) return z(s, u, t);
            if (S == ke && o.length) {
                let m = s.node, d = m.firstChild, f = d && ie(d, u), c;
                if (f) {
                    for (let p of o)if (p.tag == f && (!p.attrs || p.attrs(c || (c = Re(d, u))))) {
                        let h = m.lastChild, Q = h.type.id == _t ? h.from : m.to;
                        if (Q > d.to) return {
                            parser: p.parser,
                            overlay: [
                                {
                                    from: d.to,
                                    to: Q
                                }
                            ]
                        };
                    }
                }
            }
            if (n && S == Ve) {
                let m = s.node, d;
                if (d = m.firstChild) {
                    let f = n[u.read(d.from, d.to)];
                    if (f) for (let c of f){
                        if (c.tagName && c.tagName != ie(m.parent, u)) continue;
                        let p = m.lastChild;
                        if (p.type.id == N) {
                            let h = p.from + 1, Q = p.lastChild, $ = p.to - (Q && Q.isError ? 0 : 1);
                            if ($ > h) return {
                                parser: c.parser,
                                overlay: [
                                    {
                                        from: h,
                                        to: $
                                    }
                                ]
                            };
                        } else if (p.type.id == Ce) return {
                            parser: c.parser,
                            overlay: [
                                {
                                    from: p.from,
                                    to: p.to
                                }
                            ]
                        };
                    }
                }
            }
            return null;
        });
    }
    const Lt = 107, ue = 1, Ft = 108, Kt = 109, ce = 2, de = 110, ze = [
        9,
        10,
        11,
        12,
        13,
        32,
        133,
        160,
        5760,
        8192,
        8193,
        8194,
        8195,
        8196,
        8197,
        8198,
        8199,
        8200,
        8201,
        8202,
        8232,
        8233,
        8239,
        8287,
        12288
    ], Ht = 58, Jt = 40, Ze = 95, ea = 91, _ = 45, ta = 46, aa = 35, ra = 37, la = 38, oa = 92, na = 10, Oa = 42;
    function x(e) {
        return e >= 65 && e <= 90 || e >= 97 && e <= 122 || e >= 161;
    }
    function Ee(e) {
        return e >= 48 && e <= 57;
    }
    const sa = new P((e, a)=>{
        for(let l = !1, r = 0, t = 0;; t++){
            let { next: o } = e;
            if (x(o) || o == _ || o == Ze || l && Ee(o)) !l && (o != _ || t > 0) && (l = !0), r === t && o == _ && r++, e.advance();
            else if (o == oa && e.peek(1) != na) e.advance(), e.next > -1 && e.advance(), l = !0;
            else {
                l && e.acceptToken(r == 2 && a.canShift(ce) ? ce : a.canShift(de) ? de : o == Jt ? Ft : Kt);
                break;
            }
        }
    }), ia = new P((e)=>{
        if (ze.includes(e.peek(-1))) {
            let { next: a } = e;
            (x(a) || a == Ze || a == aa || a == ta || a == Oa || a == ea || a == Ht && x(e.peek(1)) || a == _ || a == la) && e.acceptToken(Lt);
        }
    }), ua = new P((e)=>{
        if (!ze.includes(e.peek(-1))) {
            let { next: a } = e;
            if (a == ra && (e.advance(), e.acceptToken(ue)), x(a)) {
                do e.advance();
                while (x(e.next) || Ee(e.next));
                e.acceptToken(ue);
            }
        }
    }), ca = be({
        "AtKeyword import charset namespace keyframes media supports": i.definitionKeyword,
        "from to selector": i.keyword,
        NamespaceName: i.namespace,
        KeyframeName: i.labelName,
        KeyframeRangeName: i.operatorKeyword,
        TagName: i.tagName,
        ClassName: i.className,
        PseudoClassName: i.constant(i.className),
        IdName: i.labelName,
        "FeatureName PropertyName": i.propertyName,
        AttributeName: i.attributeName,
        NumberLiteral: i.number,
        KeywordQuery: i.keyword,
        UnaryQueryOp: i.operatorKeyword,
        "CallTag ValueName": i.atom,
        VariableName: i.variableName,
        Callee: i.operatorKeyword,
        Unit: i.unit,
        "UniversalSelector NestingSelector": i.definitionOperator,
        "MatchOp CompareOp": i.compareOperator,
        "ChildOp SiblingOp, LogicOp": i.logicOperator,
        BinOp: i.arithmeticOperator,
        Important: i.modifier,
        Comment: i.blockComment,
        ColorLiteral: i.color,
        "ParenthesizedContent StringLiteral": i.string,
        ":": i.punctuation,
        "PseudoOp #": i.derefOperator,
        "; ,": i.separator,
        "( )": i.paren,
        "[ ]": i.squareBracket,
        "{ }": i.brace
    }), da = {
        __proto__: null,
        lang: 34,
        "nth-child": 34,
        "nth-last-child": 34,
        "nth-of-type": 34,
        "nth-last-of-type": 34,
        dir: 34,
        "host-context": 34,
        url: 62,
        "url-prefix": 62,
        domain: 62,
        regexp: 62
    }, pa = {
        __proto__: null,
        "@import": 120,
        "@media": 154,
        "@charset": 158,
        "@namespace": 162,
        "@keyframes": 168,
        "@supports": 180
    }, ma = {
        __proto__: null,
        layer: 124,
        not: 144,
        only: 144,
        selector: 150
    }, fa = ye.deserialize({
        version: 14,
        states: ">`QYQ[OOO#kQ[OOP#rOWOOOOQP'#Cd'#CdOOQP'#Cc'#CcO#wQ[O'#CfO$hQXO'#CaO$rQ[O'#CiO$}Q[O'#DUO%SQ[O'#DXO%XQ[O'#D[O%XQ[O'#D_OOQP'#Ev'#EvO%yQdO'#DhO&hQ[O'#DzO%yQdO'#D|O&yQ[O'#EOO'UQ[O'#ERO'^Q[O'#EXO'lQ[O'#EZOOQS'#Eu'#EuOOQS'#E^'#E^QYQ[OOO'sQXO'#CdO(hQWO'#DdO(mQWO'#E{O(xQ[O'#E{QOQWOOP)SO#tO'#C_POOO)C@e)C@eOOQP'#Ch'#ChOOQP,59Q,59QO#wQ[O,59QO)_Q[O,59TO$}Q[O,59pO%SQ[O,59sO%XQ[O,59vO%XQ[O,59xO%XQ[O,59yO%XQ[O'#EcO)jQWO,58{O)rQ[O'#DcOOQS,58{,58{OOQP'#Cl'#ClOOQO'#DS'#DSOOQP,59T,59TO)yQWO,59TO*OQWO,59TOOQP'#DW'#DWOOQP,59p,59pOOQO'#DY'#DYO*TQ`O,59sO*nQXO,59vO+UQXO,59yOOQS'#Cq'#CqO%yQdO'#CrO+lQvO'#CtO-hQtO,5:SOOQO'#Cy'#CyO*OQWO'#CxO-rQWO'#CzO-wQ[O'#DPOOQS'#Ex'#ExOOQO'#Dn'#DnO.eQdO'#DwO.uQWO'#E|O'^Q[O'#DuO/TQWO'#DxOOQO'#E}'#E}O)mQWO,5:fO/YQpO,5:hOOQS'#EQ'#EQO/bQWO,5:jO/gQ[O,5:jOOQO'#ET'#ETO/oQWO,5:mO/tQWO,5:sO/|QWO,5:uOOQS-E8[-E8[O0UQdO,5:OO0fQ[O'#EeO0sQWO,5;gO0sQWO,5;gPOOO'#E]'#E]P1OO#tO,58yPOOO,58y,58yOOQP1G.l1G.lOOQP1G.o1G.oO)yQWO1G.oO*OQWO1G.oOOQP1G/[1G/[O1ZQ`O1G/_O1cQXO1G/bO1yQXO1G/dO2aQXO1G/eO2wQXO,5:}OOQO-E8a-E8aOOQS1G.g1G.gO3RQWO,59}O3WQ[O'#DTO3_QdO'#CpOOQP1G/_1G/_O%yQdO1G/_O3fQpO,59^OOQS,59`,59`O%yQdO,59bO3nQ[O'#DkO4PQWO1G/nO-VQ[O1G/nOOQS,59d,59dO4UQ!bO,59fOOQS'#DQ'#DQOOQS'#E`'#E`O4aQ[O,59kOOQS,59k,59kO4iQpO'#DnO4wQpO,5:ZO5PQWO,5:cOOQO'#FO'#FOO4zQpO,5:_O'^Q[O,5:]O5XQ[O'#EgO5pQWO,5;hO5{QWO,5:aO%XQ[O,5:dOOQS1G0Q1G0QOOQS1G0S1G0SOOQS1G0U1G0UO6^QWO1G0UO6cQdO'#EUOOQS1G0X1G0XOOQS1G0_1G0_OOQS1G0a1G0aO6nQtO1G/jOOQO1G/j1G/jOOQO,5;P,5;PO7UQ[O,5;POOQO-E8c-E8cO7cQWO1G1RPOOO-E8Z-E8ZPOOO1G.e1G.eOOQP7+$Z7+$ZOOQP7+$y7+$yO%yQdO7+$yOOQS1G/i1G/iO7nQXO'#EzO7xQWO,59oO7}QtO'#E_O8uQdO'#EwO9PQWO,59[O9UQpO7+$yOOQS1G.x1G.xOOQS1G.|1G.|O9^Q[O,5:VOOQS7+%Y7+%YO9cQWO7+%YOOQS1G/Q1G/QO9hQWO1G/QOOQS-E8^-E8^OOQS1G/V1G/VO%yQdO1G/uO9mQdO1G/yOOQO1G/}1G/}OOQO1G/w1G/wO9tQWO,5;ROOQO-E8e-E8eO:SQXO1G0OOOQS7+%p7+%pO:ZQYO'#CtOOQO'#EW'#EWO:iQ`O'#EVOOQO'#EV'#EVO:tQWO'#EhO:|QdO,5:pOOQS,5:p,5:pO;XQtO'#EdO%yQdO'#EdO<YQdO7+%UOOQO7+%U7+%UOOQO1G0k1G0kO<mQpO<<HeO<uQ[O'#EbO=PQWO,5;fOOQP1G/Z1G/ZOOQS-E8]-E8]O=XQdO'#EaO=cQWO,5;cOOQT1G.v1G.vOOQP<<He<<HeOOQO'#Dm'#DmO=kQWO1G/qOOQS<<Ht<<HtOOQS7+$l7+$lO=sQdO7+%aOOQO'#Dp'#DpO=zQpO7+%eOOQO7+%j7+%jOOQO,5:q,5:qO6fQdO'#EiO:tQWO,5;SOOQS,5;S,5;SOOQS-E8f-E8fOOQS1G0[1G0[O>SQtO,5;OOOQS-E8b-E8bOOQO<<Hp<<HpOOQPAN>PAN>PO?TQXO,5:|OOQO-E8`-E8`O?_QdO,5:{OOQO-E8_-E8_O9^Q[O'#EfO?iQWO7+%]OOQS7+%]7+%]OOQO<<H{<<H{OOQO<<IP<<IPO?qQdO<<IPOOQO,5;T,5;TOOQO-E8g-E8gOOQS1G0n1G0nOOQO,5;Q,5;QOOQO-E8d-E8dOOQS<<Hw<<HwO@YQWOAN>kOOQOG24VG24V",
        stateData: "@g~O#dOS#eQQ~OU[OX[OZTO^VO_VOrXOyWO!PYO!SZO!]cO!^]O!o^O!q_O!s`O!vaO!|bO#aRO~OQhOU[OX[OZTO^VO_VOrXOyWO!PYO!SZO!]cO!^]O!o^O!q_O!s`O!vaO!|bO#agO~O#^#oP~P!aO#elO~O#anO~OZpO^qO_qOrsOyrO!PtO!SvO#_uO~OuwO!UyO~P#|Oa!PO#`|O#a{O~O#a!QO~O#a!SO~OU[OX[OZTO^VO_VOrXOyWO!PYO!SZO#aRO~OQ!`Oc!XOg!`Oi!`Oo!^Or!_O#`![O#a!WO#m!YO~Oc!bO!j!dO!m!eO#b!aO!U#pP~Oi!jOo!^O#a!iO~Oi!lO#a!lO~Oc!bO!j!dO!m!eO#b!aO~O!Z#pP~P&hOZWX^WX^!XX_WXrWXuWXyWX!PWX!SWX!UWX#_WX~O^!qO~O!Z!rO#^#oX!T#oX~O#^#oX!T#oX~P!aO#f!uO#g!uO#h!wO~Oa!{O#`|O#a{O~OuwO!UyO~O!T#oP~P!aOc#VO~Oc#WO~Oq#XO}#YO~OZpO^qO_qOrsOyrO~Ou!Oa!P!Oa!S!Oa!U!Oa#_!Oab!Oa~P*]Ou!Ra!P!Ra!S!Ra!U!Ra#_!Rab!Ra~P*]OP#[OchXkhX!ZhX!`hX!jhX!mhX#bhXbhX!hhXQhXghXihXohXrhXuhX!YhX#^hX#`hX#ahX#mhXqhX!ThX~Oc!bO!j!dO!m!eO#b!aO!Z#pP~Ok#]O!`#^O~P-VOc#bO~Oq#fO#a#cO~OQ#jOg#jOi#jOo!^O#`![O#m!YO~Oc!bO!j!dO!m!eO#b#gO~P.POu#mO!f#lO!U#pX!Z#pX~Oc#pO~Ok#]O!Z#rO~O!Z#sO~Oi#tOo!^O~O!U#uO~O!UyO!f#lO~O!UyO!Z#xO~O!Y#zO!Z!Wa#^!Wa!T!Wa~P%yO!Z#XX#^#XX!T#XX~P!aO!Z!rO#^#oa!T#oa~O#f!uO#g!uO#h$QO~Oq$SO}$TO~Ou!Oi!P!Oi!S!Oi!U!Oi#_!Oib!Oi~P*]Ou!Qi!P!Qi!S!Qi!U!Qi#_!Qib!Qi~P*]Ou!Ri!P!Ri!S!Ri!U!Ri#_!Rib!Ri~P*]Ou#Va!U#Va~P#|O!T$UO~Ob#nP~P%XOb#kP~P%yOb$]Ok#]O~Oc$_O!Z!_X!j!_X!m!_X#b!_X~O!Z$`O~Ob$bOi$cOp$cO~Oq$eO#a#cO~O^!dXb!bX!f!bX!h!dX~O^$fO!h$gO~Ob$hO!f#lO~Oc!bO!j!dO!m!eO#b!aOu#ZX!U#ZX!Z#ZX~Ou#mO!U#pa!Z#pa~O!f#lOu!ia!U!ia!Z!iab!ia~O!Z$mO~O!T$tO#a$oO#m$nO~Ok#]Ou$vO!Y$xO!Z!Wi#^!Wi!T!Wi~P%yO!Z#Xa#^#Xa!T#Xa~P!aO!Z!rO#^#oi!T#oi~Ou${Ob#nX~P#|Ob$}O~Ok#]OQ#RXb#RXc#RXg#RXi#RXo#RXr#RXu#RX#`#RX#a#RX#m#RX~Ou%POb#kX~P%yOb%RO~Ok#]Oq%SO~O#a%TO~O!Z%VO~Ob%WO~O#b%YO~P.PO!f#lOu#Za!U#Za!Z#Za~Ob%[O~P#|OP#[OuhX!UhXbhX~O#m$nOu!yX!U!yX~Ou%^O!UyO~O!T%bO#a$oO#m$nO~Ok#]OQ#WXc#WXg#WXi#WXo#WXr#WXu#WX!Y#WX!Z#WX#^#WX#`#WX#a#WX#m#WX!T#WX~Ou$vO!Y%eO!Z!Wq#^!Wq!T!Wq~P%yOk#]Oq%fO~Ob#UXu#UX~P%XOu${Ob#na~Ob#TXu#TX~P%yOu%POb#ka~OZ%kOb%mO~Ob%nO~P%yOb%oO!h%pO~Ok#]OQ#Wac#Wag#Wai#Wao#War#Wau#Wa!Y#Wa!Z#Wa#^#Wa#`#Wa#a#Wa#m#Wa!T#Wa~Ob#Uau#Ua~P#|Ob#Tau#Ta~P%yOZ%kOb%vO~OQ#jOg#jOi#jOo!^O#`![O#b%YO#m$nO~Ob%xO~O#dp#e#mk!S#m~",
        goto: "/l#sPPP#tP#wP$Q$dP$QP$v$QPP$|PPP%S%]%]P%oP%]P&`&w'^PPPP%]'{P(P(V$QP(]$Q(cP$QP$Q$QPPP(i)O)]PP#wPP)dP)g)m)m)x)mP)mP)mP)m)mP#wP#wP#wP*R#wP*U*X*[*c#wP#wP*h*n*}+]+c+i+o+u+{,V,],c,iPPPPPPPPPPP,o,x-n-qP.g.j.p.|/cRmQ_dOPfjy!r#|q[OPYZfjtuvwy!r#V#p#|${qSOPYZfjtuvwy!r#V#p#|${QoTR!xpQ}VR!yqQ!y!PQ#a!]R$R!{q!`]_!X!q#W#Y#]#y$T$Y$f$v$w%P%X%ip!`]_!X!q#W#Y#]#y$T$Y$f$v$w%P%X%iU#j!b$g%pU$q#u$s%^R%]$pp!`]_!X!q#W#Y#]#y$T$Y$f$v$w%P%X%iV#j!b$g%pw!]]_!X!b!q#W#Y#]#y$T$Y$f$g$v$w%P%X%i%pp!`]_!X!q#W#Y#]#y$T$Y$f$v$w%P%X%iQ!j`U#j!b$g%pR#t!kT#d!_#eQ!OVR!zqQ!y!OR$R!zQ!RWR!|rQ!TXR!}sQzUQ#TxQ#q!gQ#w!nQ#x!oQ%`$rR%s%_SiPyQ!tjQ#{!rR$y#|ZhPjy!r#|R#`!ZQ%U$_R%t%kc!f^bc!Z!b!d#`#l#mQ#h!bQ%Z$gR%w%pR!k`R!maR#v!mS$r#u$sR%q%^V$p#u$s%^Q!vlR$P!vQfOSjPyU!pfj#|R#|!rQ$Y#WU%O$Y%X%iQ%X$fR%i%PQ#e!_R$d#eQ%Q$YR%j%QQ$|$VR%h$|QxUR#SxQ$w#yR%d$wQ!siS#}!s$OR$O!tQ%l%UR%u%lQ#n!cR$k#nQ$s#uR%a$sQ%_$rR%r%__eOPfjy!r#|^UOPfjy!r#|Q!UYQ!VZQ#OtQ#PuQ#QvQ#RwQ$V#VQ$l#pR%g${R$Z#WQ!Z]Q!h_Q#Z!XQ#y!q[$X#W$Y$f%P%X%iQ$[#YQ$^#]S$u#y$wQ$z$TR%c$vR$W#VQkPR#UyQ!g^Q!ocQ#_!ZR$a#`W!c^c!Z#`Q!nbQ#i!bQ#o!dQ$i#lR$j#mQ#k!bQ%Z$gR%w%p",
        nodeNames: "⚠ Unit VariableName Comment StyleSheet RuleSet UniversalSelector TagSelector TagName NestingSelector ClassSelector . ClassName PseudoClassSelector : :: PseudoClassName PseudoClassName ) ( ArgList ValueName ParenthesizedValue ColorLiteral NumberLiteral StringLiteral BinaryExpression BinOp CallExpression Callee CallLiteral CallTag ParenthesizedContent ] [ LineNames LineName , PseudoClassName ArgList IdSelector # IdName AttributeSelector AttributeName MatchOp ChildSelector ChildOp DescendantSelector SiblingSelector SiblingOp } { Block Declaration PropertyName Important ; ImportStatement AtKeyword import Layer layer LayerName KeywordQuery FeatureQuery FeatureName BinaryQuery LogicOp ComparisonQuery CompareOp UnaryQuery UnaryQueryOp ParenthesizedQuery SelectorQuery selector MediaStatement media CharsetStatement charset NamespaceStatement namespace NamespaceName KeyframesStatement keyframes KeyframeName KeyframeList KeyframeSelector KeyframeRangeName SupportsStatement supports AtRule Styles",
        maxTerm: 126,
        nodeProps: [
            [
                "isolate",
                -2,
                3,
                25,
                ""
            ],
            [
                "openedBy",
                18,
                "(",
                33,
                "[",
                51,
                "{"
            ],
            [
                "closedBy",
                19,
                ")",
                34,
                "]",
                52,
                "}"
            ]
        ],
        propSources: [
            ca
        ],
        skippedNodes: [
            0,
            3,
            93
        ],
        repeatNodeCount: 13,
        tokenData: "LU~R!^OX$}X^%u^p$}pq%uqr)Xrs.Rst/utu6duv$}vw7^wx7oxy9^yz9oz{9t{|:_|}?Q}!O?c!O!P@Q!P!Q@i!Q![Ab![!]B]!]!^CX!^!_Cj!_!`Df!`!aDy!a!b$}!b!cEz!c!}$}!}#OHX#O#P$}#P#QHj#Q#R6d#R#T$}#T#UH{#U#c$}#c#dJ^#d#o$}#o#pJs#p#q6d#q#rKU#r#sKg#s#y$}#y#z%u#z$f$}$f$g%u$g#BY$}#BY#BZ%u#BZ$IS$}$IS$I_%u$I_$I|$}$I|$JO%u$JO$JT$}$JT$JU%u$JU$KV$}$KV$KW%u$KW&FU$}&FU&FV%u&FV;'S$};'S;=`LO<%lO$}`%QSOy%^z;'S%^;'S;=`%o<%lO%^`%cSp`Oy%^z;'S%^;'S;=`%o<%lO%^`%rP;=`<%l%^~%zh#d~OX%^X^'f^p%^pq'fqy%^z#y%^#y#z'f#z$f%^$f$g'f$g#BY%^#BY#BZ'f#BZ$IS%^$IS$I_'f$I_$I|%^$I|$JO'f$JO$JT%^$JT$JU'f$JU$KV%^$KV$KW'f$KW&FU%^&FU&FV'f&FV;'S%^;'S;=`%o<%lO%^~'mh#d~p`OX%^X^'f^p%^pq'fqy%^z#y%^#y#z'f#z$f%^$f$g'f$g#BY%^#BY#BZ'f#BZ$IS%^$IS$I_'f$I_$I|%^$I|$JO'f$JO$JT%^$JT$JU'f$JU$KV%^$KV$KW'f$KW&FU%^&FU&FV'f&FV;'S%^;'S;=`%o<%lO%^l)[UOy%^z#]%^#]#^)n#^;'S%^;'S;=`%o<%lO%^l)sUp`Oy%^z#a%^#a#b*V#b;'S%^;'S;=`%o<%lO%^l*[Up`Oy%^z#d%^#d#e*n#e;'S%^;'S;=`%o<%lO%^l*sUp`Oy%^z#c%^#c#d+V#d;'S%^;'S;=`%o<%lO%^l+[Up`Oy%^z#f%^#f#g+n#g;'S%^;'S;=`%o<%lO%^l+sUp`Oy%^z#h%^#h#i,V#i;'S%^;'S;=`%o<%lO%^l,[Up`Oy%^z#T%^#T#U,n#U;'S%^;'S;=`%o<%lO%^l,sUp`Oy%^z#b%^#b#c-V#c;'S%^;'S;=`%o<%lO%^l-[Up`Oy%^z#h%^#h#i-n#i;'S%^;'S;=`%o<%lO%^l-uS!Y[p`Oy%^z;'S%^;'S;=`%o<%lO%^~.UWOY.RZr.Rrs.ns#O.R#O#P.s#P;'S.R;'S;=`/o<%lO.R~.sOi~~.vRO;'S.R;'S;=`/P;=`O.R~/SXOY.RZr.Rrs.ns#O.R#O#P.s#P;'S.R;'S;=`/o;=`<%l.R<%lO.R~/rP;=`<%l.Rn/zYyQOy%^z!Q%^!Q![0j![!c%^!c!i0j!i#T%^#T#Z0j#Z;'S%^;'S;=`%o<%lO%^l0oYp`Oy%^z!Q%^!Q![1_![!c%^!c!i1_!i#T%^#T#Z1_#Z;'S%^;'S;=`%o<%lO%^l1dYp`Oy%^z!Q%^!Q![2S![!c%^!c!i2S!i#T%^#T#Z2S#Z;'S%^;'S;=`%o<%lO%^l2ZYg[p`Oy%^z!Q%^!Q![2y![!c%^!c!i2y!i#T%^#T#Z2y#Z;'S%^;'S;=`%o<%lO%^l3QYg[p`Oy%^z!Q%^!Q![3p![!c%^!c!i3p!i#T%^#T#Z3p#Z;'S%^;'S;=`%o<%lO%^l3uYp`Oy%^z!Q%^!Q![4e![!c%^!c!i4e!i#T%^#T#Z4e#Z;'S%^;'S;=`%o<%lO%^l4lYg[p`Oy%^z!Q%^!Q![5[![!c%^!c!i5[!i#T%^#T#Z5[#Z;'S%^;'S;=`%o<%lO%^l5aYp`Oy%^z!Q%^!Q![6P![!c%^!c!i6P!i#T%^#T#Z6P#Z;'S%^;'S;=`%o<%lO%^l6WSg[p`Oy%^z;'S%^;'S;=`%o<%lO%^d6gUOy%^z!_%^!_!`6y!`;'S%^;'S;=`%o<%lO%^d7QS}Sp`Oy%^z;'S%^;'S;=`%o<%lO%^b7cSXQOy%^z;'S%^;'S;=`%o<%lO%^~7rWOY7oZw7owx.nx#O7o#O#P8[#P;'S7o;'S;=`9W<%lO7o~8_RO;'S7o;'S;=`8h;=`O7o~8kXOY7oZw7owx.nx#O7o#O#P8[#P;'S7o;'S;=`9W;=`<%l7o<%lO7o~9ZP;=`<%l7on9cSc^Oy%^z;'S%^;'S;=`%o<%lO%^~9tOb~n9{UUQkWOy%^z!_%^!_!`6y!`;'S%^;'S;=`%o<%lO%^n:fWkW!SQOy%^z!O%^!O!P;O!P!Q%^!Q![>T![;'S%^;'S;=`%o<%lO%^l;TUp`Oy%^z!Q%^!Q![;g![;'S%^;'S;=`%o<%lO%^l;nYp`#m[Oy%^z!Q%^!Q![;g![!g%^!g!h<^!h#X%^#X#Y<^#Y;'S%^;'S;=`%o<%lO%^l<cYp`Oy%^z{%^{|=R|}%^}!O=R!O!Q%^!Q![=j![;'S%^;'S;=`%o<%lO%^l=WUp`Oy%^z!Q%^!Q![=j![;'S%^;'S;=`%o<%lO%^l=qUp`#m[Oy%^z!Q%^!Q![=j![;'S%^;'S;=`%o<%lO%^l>[[p`#m[Oy%^z!O%^!O!P;g!P!Q%^!Q![>T![!g%^!g!h<^!h#X%^#X#Y<^#Y;'S%^;'S;=`%o<%lO%^n?VSu^Oy%^z;'S%^;'S;=`%o<%lO%^l?hWkWOy%^z!O%^!O!P;O!P!Q%^!Q![>T![;'S%^;'S;=`%o<%lO%^n@VUZQOy%^z!Q%^!Q![;g![;'S%^;'S;=`%o<%lO%^~@nTkWOy%^z{@}{;'S%^;'S;=`%o<%lO%^~AUSp`#e~Oy%^z;'S%^;'S;=`%o<%lO%^lAg[#m[Oy%^z!O%^!O!P;g!P!Q%^!Q![>T![!g%^!g!h<^!h#X%^#X#Y<^#Y;'S%^;'S;=`%o<%lO%^jBbU^YOy%^z![%^![!]Bt!];'S%^;'S;=`%o<%lO%^bB{S_Qp`Oy%^z;'S%^;'S;=`%o<%lO%^nC^S!Z^Oy%^z;'S%^;'S;=`%o<%lO%^hCoU!hWOy%^z!_%^!_!`DR!`;'S%^;'S;=`%o<%lO%^hDYS!hWp`Oy%^z;'S%^;'S;=`%o<%lO%^lDmS!hW}SOy%^z;'S%^;'S;=`%o<%lO%^jEQV!PQ!hWOy%^z!_%^!_!`DR!`!aEg!a;'S%^;'S;=`%o<%lO%^bEnS!PQp`Oy%^z;'S%^;'S;=`%o<%lO%^bE}YOy%^z}%^}!OFm!O!c%^!c!}G[!}#T%^#T#oG[#o;'S%^;'S;=`%o<%lO%^bFrWp`Oy%^z!c%^!c!}G[!}#T%^#T#oG[#o;'S%^;'S;=`%o<%lO%^bGc[!]Qp`Oy%^z}%^}!OG[!O!Q%^!Q![G[![!c%^!c!}G[!}#T%^#T#oG[#o;'S%^;'S;=`%o<%lO%^nH^Sr^Oy%^z;'S%^;'S;=`%o<%lO%^nHoSq^Oy%^z;'S%^;'S;=`%o<%lO%^jIOUOy%^z#b%^#b#cIb#c;'S%^;'S;=`%o<%lO%^jIgUp`Oy%^z#W%^#W#XIy#X;'S%^;'S;=`%o<%lO%^jJQS!fYp`Oy%^z;'S%^;'S;=`%o<%lO%^jJaUOy%^z#f%^#f#gIy#g;'S%^;'S;=`%o<%lO%^fJxS!UUOy%^z;'S%^;'S;=`%o<%lO%^nKZS!T^Oy%^z;'S%^;'S;=`%o<%lO%^fKlU!SQOy%^z!_%^!_!`6y!`;'S%^;'S;=`%o<%lO%^`LRP;=`<%l$}",
        tokenizers: [
            ia,
            ua,
            sa,
            1,
            2,
            3,
            4,
            new Fe("m~RRYZ[z{a~~g~aO#g~~dP!P!Qg~lO#h~~", 28, 114)
        ],
        topRules: {
            StyleSheet: [
                0,
                4
            ],
            Styles: [
                1,
                92
            ]
        },
        specialized: [
            {
                term: 108,
                get: (e)=>da[e] || -1
            },
            {
                term: 59,
                get: (e)=>pa[e] || -1
            },
            {
                term: 110,
                get: (e)=>ma[e] || -1
            }
        ],
        tokenPrec: 1441
    });
    let Z = null;
    function E() {
        if (!Z && typeof document == "object" && document.body) {
            let { style: e } = document.body, a = [], l = new Set;
            for(let r in e)r != "cssText" && r != "cssFloat" && typeof e[r] == "string" && (/[A-Z]/.test(r) && (r = r.replace(/[A-Z]/g, (t)=>"-" + t.toLowerCase())), l.has(r) || (a.push(r), l.add(r)));
            Z = a.sort().map((r)=>({
                    type: "property",
                    label: r,
                    apply: r + ": "
                }));
        }
        return Z || [];
    }
    const pe = [
        "active",
        "after",
        "any-link",
        "autofill",
        "backdrop",
        "before",
        "checked",
        "cue",
        "default",
        "defined",
        "disabled",
        "empty",
        "enabled",
        "file-selector-button",
        "first",
        "first-child",
        "first-letter",
        "first-line",
        "first-of-type",
        "focus",
        "focus-visible",
        "focus-within",
        "fullscreen",
        "has",
        "host",
        "host-context",
        "hover",
        "in-range",
        "indeterminate",
        "invalid",
        "is",
        "lang",
        "last-child",
        "last-of-type",
        "left",
        "link",
        "marker",
        "modal",
        "not",
        "nth-child",
        "nth-last-child",
        "nth-last-of-type",
        "nth-of-type",
        "only-child",
        "only-of-type",
        "optional",
        "out-of-range",
        "part",
        "placeholder",
        "placeholder-shown",
        "read-only",
        "read-write",
        "required",
        "right",
        "root",
        "scope",
        "selection",
        "slotted",
        "target",
        "target-text",
        "valid",
        "visited",
        "where"
    ].map((e)=>({
            type: "class",
            label: e
        })), me = [
        "above",
        "absolute",
        "activeborder",
        "additive",
        "activecaption",
        "after-white-space",
        "ahead",
        "alias",
        "all",
        "all-scroll",
        "alphabetic",
        "alternate",
        "always",
        "antialiased",
        "appworkspace",
        "asterisks",
        "attr",
        "auto",
        "auto-flow",
        "avoid",
        "avoid-column",
        "avoid-page",
        "avoid-region",
        "axis-pan",
        "background",
        "backwards",
        "baseline",
        "below",
        "bidi-override",
        "blink",
        "block",
        "block-axis",
        "bold",
        "bolder",
        "border",
        "border-box",
        "both",
        "bottom",
        "break",
        "break-all",
        "break-word",
        "bullets",
        "button",
        "button-bevel",
        "buttonface",
        "buttonhighlight",
        "buttonshadow",
        "buttontext",
        "calc",
        "capitalize",
        "caps-lock-indicator",
        "caption",
        "captiontext",
        "caret",
        "cell",
        "center",
        "checkbox",
        "circle",
        "cjk-decimal",
        "clear",
        "clip",
        "close-quote",
        "col-resize",
        "collapse",
        "color",
        "color-burn",
        "color-dodge",
        "column",
        "column-reverse",
        "compact",
        "condensed",
        "contain",
        "content",
        "contents",
        "content-box",
        "context-menu",
        "continuous",
        "copy",
        "counter",
        "counters",
        "cover",
        "crop",
        "cross",
        "crosshair",
        "currentcolor",
        "cursive",
        "cyclic",
        "darken",
        "dashed",
        "decimal",
        "decimal-leading-zero",
        "default",
        "default-button",
        "dense",
        "destination-atop",
        "destination-in",
        "destination-out",
        "destination-over",
        "difference",
        "disc",
        "discard",
        "disclosure-closed",
        "disclosure-open",
        "document",
        "dot-dash",
        "dot-dot-dash",
        "dotted",
        "double",
        "down",
        "e-resize",
        "ease",
        "ease-in",
        "ease-in-out",
        "ease-out",
        "element",
        "ellipse",
        "ellipsis",
        "embed",
        "end",
        "ethiopic-abegede-gez",
        "ethiopic-halehame-aa-er",
        "ethiopic-halehame-gez",
        "ew-resize",
        "exclusion",
        "expanded",
        "extends",
        "extra-condensed",
        "extra-expanded",
        "fantasy",
        "fast",
        "fill",
        "fill-box",
        "fixed",
        "flat",
        "flex",
        "flex-end",
        "flex-start",
        "footnotes",
        "forwards",
        "from",
        "geometricPrecision",
        "graytext",
        "grid",
        "groove",
        "hand",
        "hard-light",
        "help",
        "hidden",
        "hide",
        "higher",
        "highlight",
        "highlighttext",
        "horizontal",
        "hsl",
        "hsla",
        "hue",
        "icon",
        "ignore",
        "inactiveborder",
        "inactivecaption",
        "inactivecaptiontext",
        "infinite",
        "infobackground",
        "infotext",
        "inherit",
        "initial",
        "inline",
        "inline-axis",
        "inline-block",
        "inline-flex",
        "inline-grid",
        "inline-table",
        "inset",
        "inside",
        "intrinsic",
        "invert",
        "italic",
        "justify",
        "keep-all",
        "landscape",
        "large",
        "larger",
        "left",
        "level",
        "lighter",
        "lighten",
        "line-through",
        "linear",
        "linear-gradient",
        "lines",
        "list-item",
        "listbox",
        "listitem",
        "local",
        "logical",
        "loud",
        "lower",
        "lower-hexadecimal",
        "lower-latin",
        "lower-norwegian",
        "lowercase",
        "ltr",
        "luminosity",
        "manipulation",
        "match",
        "matrix",
        "matrix3d",
        "medium",
        "menu",
        "menutext",
        "message-box",
        "middle",
        "min-intrinsic",
        "mix",
        "monospace",
        "move",
        "multiple",
        "multiple_mask_images",
        "multiply",
        "n-resize",
        "narrower",
        "ne-resize",
        "nesw-resize",
        "no-close-quote",
        "no-drop",
        "no-open-quote",
        "no-repeat",
        "none",
        "normal",
        "not-allowed",
        "nowrap",
        "ns-resize",
        "numbers",
        "numeric",
        "nw-resize",
        "nwse-resize",
        "oblique",
        "opacity",
        "open-quote",
        "optimizeLegibility",
        "optimizeSpeed",
        "outset",
        "outside",
        "outside-shape",
        "overlay",
        "overline",
        "padding",
        "padding-box",
        "painted",
        "page",
        "paused",
        "perspective",
        "pinch-zoom",
        "plus-darker",
        "plus-lighter",
        "pointer",
        "polygon",
        "portrait",
        "pre",
        "pre-line",
        "pre-wrap",
        "preserve-3d",
        "progress",
        "push-button",
        "radial-gradient",
        "radio",
        "read-only",
        "read-write",
        "read-write-plaintext-only",
        "rectangle",
        "region",
        "relative",
        "repeat",
        "repeating-linear-gradient",
        "repeating-radial-gradient",
        "repeat-x",
        "repeat-y",
        "reset",
        "reverse",
        "rgb",
        "rgba",
        "ridge",
        "right",
        "rotate",
        "rotate3d",
        "rotateX",
        "rotateY",
        "rotateZ",
        "round",
        "row",
        "row-resize",
        "row-reverse",
        "rtl",
        "run-in",
        "running",
        "s-resize",
        "sans-serif",
        "saturation",
        "scale",
        "scale3d",
        "scaleX",
        "scaleY",
        "scaleZ",
        "screen",
        "scroll",
        "scrollbar",
        "scroll-position",
        "se-resize",
        "self-start",
        "self-end",
        "semi-condensed",
        "semi-expanded",
        "separate",
        "serif",
        "show",
        "single",
        "skew",
        "skewX",
        "skewY",
        "skip-white-space",
        "slide",
        "slider-horizontal",
        "slider-vertical",
        "sliderthumb-horizontal",
        "sliderthumb-vertical",
        "slow",
        "small",
        "small-caps",
        "small-caption",
        "smaller",
        "soft-light",
        "solid",
        "source-atop",
        "source-in",
        "source-out",
        "source-over",
        "space",
        "space-around",
        "space-between",
        "space-evenly",
        "spell-out",
        "square",
        "start",
        "static",
        "status-bar",
        "stretch",
        "stroke",
        "stroke-box",
        "sub",
        "subpixel-antialiased",
        "svg_masks",
        "super",
        "sw-resize",
        "symbolic",
        "symbols",
        "system-ui",
        "table",
        "table-caption",
        "table-cell",
        "table-column",
        "table-column-group",
        "table-footer-group",
        "table-header-group",
        "table-row",
        "table-row-group",
        "text",
        "text-bottom",
        "text-top",
        "textarea",
        "textfield",
        "thick",
        "thin",
        "threeddarkshadow",
        "threedface",
        "threedhighlight",
        "threedlightshadow",
        "threedshadow",
        "to",
        "top",
        "transform",
        "translate",
        "translate3d",
        "translateX",
        "translateY",
        "translateZ",
        "transparent",
        "ultra-condensed",
        "ultra-expanded",
        "underline",
        "unidirectional-pan",
        "unset",
        "up",
        "upper-latin",
        "uppercase",
        "url",
        "var",
        "vertical",
        "vertical-text",
        "view-box",
        "visible",
        "visibleFill",
        "visiblePainted",
        "visibleStroke",
        "visual",
        "w-resize",
        "wait",
        "wave",
        "wider",
        "window",
        "windowframe",
        "windowtext",
        "words",
        "wrap",
        "wrap-reverse",
        "x-large",
        "x-small",
        "xor",
        "xx-large",
        "xx-small"
    ].map((e)=>({
            type: "keyword",
            label: e
        })).concat([
        "aliceblue",
        "antiquewhite",
        "aqua",
        "aquamarine",
        "azure",
        "beige",
        "bisque",
        "black",
        "blanchedalmond",
        "blue",
        "blueviolet",
        "brown",
        "burlywood",
        "cadetblue",
        "chartreuse",
        "chocolate",
        "coral",
        "cornflowerblue",
        "cornsilk",
        "crimson",
        "cyan",
        "darkblue",
        "darkcyan",
        "darkgoldenrod",
        "darkgray",
        "darkgreen",
        "darkkhaki",
        "darkmagenta",
        "darkolivegreen",
        "darkorange",
        "darkorchid",
        "darkred",
        "darksalmon",
        "darkseagreen",
        "darkslateblue",
        "darkslategray",
        "darkturquoise",
        "darkviolet",
        "deeppink",
        "deepskyblue",
        "dimgray",
        "dodgerblue",
        "firebrick",
        "floralwhite",
        "forestgreen",
        "fuchsia",
        "gainsboro",
        "ghostwhite",
        "gold",
        "goldenrod",
        "gray",
        "grey",
        "green",
        "greenyellow",
        "honeydew",
        "hotpink",
        "indianred",
        "indigo",
        "ivory",
        "khaki",
        "lavender",
        "lavenderblush",
        "lawngreen",
        "lemonchiffon",
        "lightblue",
        "lightcoral",
        "lightcyan",
        "lightgoldenrodyellow",
        "lightgray",
        "lightgreen",
        "lightpink",
        "lightsalmon",
        "lightseagreen",
        "lightskyblue",
        "lightslategray",
        "lightsteelblue",
        "lightyellow",
        "lime",
        "limegreen",
        "linen",
        "magenta",
        "maroon",
        "mediumaquamarine",
        "mediumblue",
        "mediumorchid",
        "mediumpurple",
        "mediumseagreen",
        "mediumslateblue",
        "mediumspringgreen",
        "mediumturquoise",
        "mediumvioletred",
        "midnightblue",
        "mintcream",
        "mistyrose",
        "moccasin",
        "navajowhite",
        "navy",
        "oldlace",
        "olive",
        "olivedrab",
        "orange",
        "orangered",
        "orchid",
        "palegoldenrod",
        "palegreen",
        "paleturquoise",
        "palevioletred",
        "papayawhip",
        "peachpuff",
        "peru",
        "pink",
        "plum",
        "powderblue",
        "purple",
        "rebeccapurple",
        "red",
        "rosybrown",
        "royalblue",
        "saddlebrown",
        "salmon",
        "sandybrown",
        "seagreen",
        "seashell",
        "sienna",
        "silver",
        "skyblue",
        "slateblue",
        "slategray",
        "snow",
        "springgreen",
        "steelblue",
        "tan",
        "teal",
        "thistle",
        "tomato",
        "turquoise",
        "violet",
        "wheat",
        "white",
        "whitesmoke",
        "yellow",
        "yellowgreen"
    ].map((e)=>({
            type: "constant",
            label: e
        }))), Sa = [
        "a",
        "abbr",
        "address",
        "article",
        "aside",
        "b",
        "bdi",
        "bdo",
        "blockquote",
        "body",
        "br",
        "button",
        "canvas",
        "caption",
        "cite",
        "code",
        "col",
        "colgroup",
        "dd",
        "del",
        "details",
        "dfn",
        "dialog",
        "div",
        "dl",
        "dt",
        "em",
        "figcaption",
        "figure",
        "footer",
        "form",
        "header",
        "hgroup",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "hr",
        "html",
        "i",
        "iframe",
        "img",
        "input",
        "ins",
        "kbd",
        "label",
        "legend",
        "li",
        "main",
        "meter",
        "nav",
        "ol",
        "output",
        "p",
        "pre",
        "ruby",
        "section",
        "select",
        "small",
        "source",
        "span",
        "strong",
        "sub",
        "summary",
        "sup",
        "table",
        "tbody",
        "td",
        "template",
        "textarea",
        "tfoot",
        "th",
        "thead",
        "tr",
        "u",
        "ul"
    ].map((e)=>({
            type: "type",
            label: e
        })), ga = [
        "@charset",
        "@color-profile",
        "@container",
        "@counter-style",
        "@font-face",
        "@font-feature-values",
        "@font-palette-values",
        "@import",
        "@keyframes",
        "@layer",
        "@media",
        "@namespace",
        "@page",
        "@position-try",
        "@property",
        "@scope",
        "@starting-style",
        "@supports",
        "@view-transition"
    ].map((e)=>({
            type: "keyword",
            label: e
        })), b = /^(\w[\w-]*|-\w[\w-]*|)$/, ha = /^-(-[\w-]*)?$/;
    function Qa(e, a) {
        var l;
        if ((e.name == "(" || e.type.isError) && (e = e.parent || e), e.name != "ArgList") return !1;
        let r = (l = e.parent) === null || l === void 0 ? void 0 : l.firstChild;
        return r?.name != "Callee" ? !1 : a.sliceString(r.from, r.to) == "var";
    }
    const fe = new et, ba = [
        "Declaration"
    ];
    function ya(e) {
        for(let a = e;;){
            if (a.type.isTop) return a;
            if (!(a = a.parent)) return e;
        }
    }
    function Ae(e, a, l) {
        if (a.to - a.from > 4096) {
            let r = fe.get(a);
            if (r) return r;
            let t = [], o = new Set, n = a.cursor(Je.IncludeAnonymous);
            if (n.firstChild()) do for (let s of Ae(e, n.node, l))o.has(s.label) || (o.add(s.label), t.push(s));
            while (n.nextSibling());
            return fe.set(a, t), t;
        } else {
            let r = [], t = new Set;
            return a.cursor().iterate((o)=>{
                var n;
                if (l(o) && o.matchContext(ba) && ((n = o.node.nextSibling) === null || n === void 0 ? void 0 : n.name) == ":") {
                    let s = e.sliceString(o.from, o.to);
                    t.has(s) || (t.add(s), r.push({
                        label: s,
                        type: "variable"
                    }));
                }
            }), r;
        }
    }
    const Pa = (e)=>(a)=>{
            let { state: l, pos: r } = a, t = M(l).resolveInner(r, -1), o = t.type.isError && t.from == t.to - 1 && l.doc.sliceString(t.from, t.to) == "-";
            if (t.name == "PropertyName" || (o || t.name == "TagName") && /^(Block|Styles)$/.test(t.resolve(t.to).name)) return {
                from: t.from,
                options: E(),
                validFor: b
            };
            if (t.name == "ValueName") return {
                from: t.from,
                options: me,
                validFor: b
            };
            if (t.name == "PseudoClassName") return {
                from: t.from,
                options: pe,
                validFor: b
            };
            if (e(t) || (a.explicit || o) && Qa(t, l.doc)) return {
                from: e(t) || o ? t.from : r,
                options: Ae(l.doc, ya(t), e),
                validFor: ha
            };
            if (t.name == "TagName") {
                for(let { parent: u } = t; u; u = u.parent)if (u.name == "Block") return {
                    from: t.from,
                    options: E(),
                    validFor: b
                };
                return {
                    from: t.from,
                    options: Sa,
                    validFor: b
                };
            }
            if (t.name == "AtKeyword") return {
                from: t.from,
                options: ga,
                validFor: b
            };
            if (!a.explicit) return null;
            let n = t.resolve(r), s = n.childBefore(r);
            return s && s.name == ":" && n.name == "PseudoClassSelector" ? {
                from: r,
                options: pe,
                validFor: b
            } : s && s.name == ":" && n.name == "Declaration" || n.name == "ArgList" ? {
                from: r,
                options: me,
                validFor: b
            } : n.name == "Block" || n.name == "Styles" ? {
                from: r,
                options: E(),
                validFor: b
            } : null;
        }, $a = Pa((e)=>e.name == "VariableName"), W = Pe.define({
        name: "css",
        parser: fa.configure({
            props: [
                $e.add({
                    Declaration: Ke()
                }),
                we.add({
                    "Block KeyframeList": He
                })
            ]
        }),
        languageData: {
            commentTokens: {
                block: {
                    open: "/*",
                    close: "*/"
                }
            },
            indentOnInput: /^\s*\}$/,
            wordChars: "-"
        }
    });
    function wa() {
        return new Xe(W, W.data.of({
            autocomplete: $a
        }));
    }
    const T = [
        "_blank",
        "_self",
        "_top",
        "_parent"
    ], A = [
        "ascii",
        "utf-8",
        "utf-16",
        "latin1",
        "latin1"
    ], U = [
        "get",
        "post",
        "put",
        "delete"
    ], G = [
        "application/x-www-form-urlencoded",
        "multipart/form-data",
        "text/plain"
    ], g = [
        "true",
        "false"
    ], O = {}, Xa = {
        a: {
            attrs: {
                href: null,
                ping: null,
                type: null,
                media: null,
                target: T,
                hreflang: null
            }
        },
        abbr: O,
        address: O,
        area: {
            attrs: {
                alt: null,
                coords: null,
                href: null,
                target: null,
                ping: null,
                media: null,
                hreflang: null,
                type: null,
                shape: [
                    "default",
                    "rect",
                    "circle",
                    "poly"
                ]
            }
        },
        article: O,
        aside: O,
        audio: {
            attrs: {
                src: null,
                mediagroup: null,
                crossorigin: [
                    "anonymous",
                    "use-credentials"
                ],
                preload: [
                    "none",
                    "metadata",
                    "auto"
                ],
                autoplay: [
                    "autoplay"
                ],
                loop: [
                    "loop"
                ],
                controls: [
                    "controls"
                ]
            }
        },
        b: O,
        base: {
            attrs: {
                href: null,
                target: T
            }
        },
        bdi: O,
        bdo: O,
        blockquote: {
            attrs: {
                cite: null
            }
        },
        body: O,
        br: O,
        button: {
            attrs: {
                form: null,
                formaction: null,
                name: null,
                value: null,
                autofocus: [
                    "autofocus"
                ],
                disabled: [
                    "autofocus"
                ],
                formenctype: G,
                formmethod: U,
                formnovalidate: [
                    "novalidate"
                ],
                formtarget: T,
                type: [
                    "submit",
                    "reset",
                    "button"
                ]
            }
        },
        canvas: {
            attrs: {
                width: null,
                height: null
            }
        },
        caption: O,
        center: O,
        cite: O,
        code: O,
        col: {
            attrs: {
                span: null
            }
        },
        colgroup: {
            attrs: {
                span: null
            }
        },
        command: {
            attrs: {
                type: [
                    "command",
                    "checkbox",
                    "radio"
                ],
                label: null,
                icon: null,
                radiogroup: null,
                command: null,
                title: null,
                disabled: [
                    "disabled"
                ],
                checked: [
                    "checked"
                ]
            }
        },
        data: {
            attrs: {
                value: null
            }
        },
        datagrid: {
            attrs: {
                disabled: [
                    "disabled"
                ],
                multiple: [
                    "multiple"
                ]
            }
        },
        datalist: {
            attrs: {
                data: null
            }
        },
        dd: O,
        del: {
            attrs: {
                cite: null,
                datetime: null
            }
        },
        details: {
            attrs: {
                open: [
                    "open"
                ]
            }
        },
        dfn: O,
        div: O,
        dl: O,
        dt: O,
        em: O,
        embed: {
            attrs: {
                src: null,
                type: null,
                width: null,
                height: null
            }
        },
        eventsource: {
            attrs: {
                src: null
            }
        },
        fieldset: {
            attrs: {
                disabled: [
                    "disabled"
                ],
                form: null,
                name: null
            }
        },
        figcaption: O,
        figure: O,
        footer: O,
        form: {
            attrs: {
                action: null,
                name: null,
                "accept-charset": A,
                autocomplete: [
                    "on",
                    "off"
                ],
                enctype: G,
                method: U,
                novalidate: [
                    "novalidate"
                ],
                target: T
            }
        },
        h1: O,
        h2: O,
        h3: O,
        h4: O,
        h5: O,
        h6: O,
        head: {
            children: [
                "title",
                "base",
                "link",
                "style",
                "meta",
                "script",
                "noscript",
                "command"
            ]
        },
        header: O,
        hgroup: O,
        hr: O,
        html: {
            attrs: {
                manifest: null
            }
        },
        i: O,
        iframe: {
            attrs: {
                src: null,
                srcdoc: null,
                name: null,
                width: null,
                height: null,
                sandbox: [
                    "allow-top-navigation",
                    "allow-same-origin",
                    "allow-forms",
                    "allow-scripts"
                ],
                seamless: [
                    "seamless"
                ]
            }
        },
        img: {
            attrs: {
                alt: null,
                src: null,
                ismap: null,
                usemap: null,
                width: null,
                height: null,
                crossorigin: [
                    "anonymous",
                    "use-credentials"
                ]
            }
        },
        input: {
            attrs: {
                alt: null,
                dirname: null,
                form: null,
                formaction: null,
                height: null,
                list: null,
                max: null,
                maxlength: null,
                min: null,
                name: null,
                pattern: null,
                placeholder: null,
                size: null,
                src: null,
                step: null,
                value: null,
                width: null,
                accept: [
                    "audio/*",
                    "video/*",
                    "image/*"
                ],
                autocomplete: [
                    "on",
                    "off"
                ],
                autofocus: [
                    "autofocus"
                ],
                checked: [
                    "checked"
                ],
                disabled: [
                    "disabled"
                ],
                formenctype: G,
                formmethod: U,
                formnovalidate: [
                    "novalidate"
                ],
                formtarget: T,
                multiple: [
                    "multiple"
                ],
                readonly: [
                    "readonly"
                ],
                required: [
                    "required"
                ],
                type: [
                    "hidden",
                    "text",
                    "search",
                    "tel",
                    "url",
                    "email",
                    "password",
                    "datetime",
                    "date",
                    "month",
                    "week",
                    "time",
                    "datetime-local",
                    "number",
                    "range",
                    "color",
                    "checkbox",
                    "radio",
                    "file",
                    "submit",
                    "image",
                    "reset",
                    "button"
                ]
            }
        },
        ins: {
            attrs: {
                cite: null,
                datetime: null
            }
        },
        kbd: O,
        keygen: {
            attrs: {
                challenge: null,
                form: null,
                name: null,
                autofocus: [
                    "autofocus"
                ],
                disabled: [
                    "disabled"
                ],
                keytype: [
                    "RSA"
                ]
            }
        },
        label: {
            attrs: {
                for: null,
                form: null
            }
        },
        legend: O,
        li: {
            attrs: {
                value: null
            }
        },
        link: {
            attrs: {
                href: null,
                type: null,
                hreflang: null,
                media: null,
                sizes: [
                    "all",
                    "16x16",
                    "16x16 32x32",
                    "16x16 32x32 64x64"
                ]
            }
        },
        map: {
            attrs: {
                name: null
            }
        },
        mark: O,
        menu: {
            attrs: {
                label: null,
                type: [
                    "list",
                    "context",
                    "toolbar"
                ]
            }
        },
        meta: {
            attrs: {
                content: null,
                charset: A,
                name: [
                    "viewport",
                    "application-name",
                    "author",
                    "description",
                    "generator",
                    "keywords"
                ],
                "http-equiv": [
                    "content-language",
                    "content-type",
                    "default-style",
                    "refresh"
                ]
            }
        },
        meter: {
            attrs: {
                value: null,
                min: null,
                low: null,
                high: null,
                max: null,
                optimum: null
            }
        },
        nav: O,
        noscript: O,
        object: {
            attrs: {
                data: null,
                type: null,
                name: null,
                usemap: null,
                form: null,
                width: null,
                height: null,
                typemustmatch: [
                    "typemustmatch"
                ]
            }
        },
        ol: {
            attrs: {
                reversed: [
                    "reversed"
                ],
                start: null,
                type: [
                    "1",
                    "a",
                    "A",
                    "i",
                    "I"
                ]
            },
            children: [
                "li",
                "script",
                "template",
                "ul",
                "ol"
            ]
        },
        optgroup: {
            attrs: {
                disabled: [
                    "disabled"
                ],
                label: null
            }
        },
        option: {
            attrs: {
                disabled: [
                    "disabled"
                ],
                label: null,
                selected: [
                    "selected"
                ],
                value: null
            }
        },
        output: {
            attrs: {
                for: null,
                form: null,
                name: null
            }
        },
        p: O,
        param: {
            attrs: {
                name: null,
                value: null
            }
        },
        pre: O,
        progress: {
            attrs: {
                value: null,
                max: null
            }
        },
        q: {
            attrs: {
                cite: null
            }
        },
        rp: O,
        rt: O,
        ruby: O,
        samp: O,
        script: {
            attrs: {
                type: [
                    "text/javascript"
                ],
                src: null,
                async: [
                    "async"
                ],
                defer: [
                    "defer"
                ],
                charset: A
            }
        },
        section: O,
        select: {
            attrs: {
                form: null,
                name: null,
                size: null,
                autofocus: [
                    "autofocus"
                ],
                disabled: [
                    "disabled"
                ],
                multiple: [
                    "multiple"
                ]
            }
        },
        slot: {
            attrs: {
                name: null
            }
        },
        small: O,
        source: {
            attrs: {
                src: null,
                type: null,
                media: null
            }
        },
        span: O,
        strong: O,
        style: {
            attrs: {
                type: [
                    "text/css"
                ],
                media: null,
                scoped: null
            }
        },
        sub: O,
        summary: O,
        sup: O,
        table: O,
        tbody: O,
        td: {
            attrs: {
                colspan: null,
                rowspan: null,
                headers: null
            }
        },
        template: O,
        textarea: {
            attrs: {
                dirname: null,
                form: null,
                maxlength: null,
                name: null,
                placeholder: null,
                rows: null,
                cols: null,
                autofocus: [
                    "autofocus"
                ],
                disabled: [
                    "disabled"
                ],
                readonly: [
                    "readonly"
                ],
                required: [
                    "required"
                ],
                wrap: [
                    "soft",
                    "hard"
                ]
            }
        },
        tfoot: O,
        th: {
            attrs: {
                colspan: null,
                rowspan: null,
                headers: null,
                scope: [
                    "row",
                    "col",
                    "rowgroup",
                    "colgroup"
                ]
            }
        },
        thead: O,
        time: {
            attrs: {
                datetime: null
            }
        },
        title: O,
        tr: O,
        track: {
            attrs: {
                src: null,
                label: null,
                default: null,
                kind: [
                    "subtitles",
                    "captions",
                    "descriptions",
                    "chapters",
                    "metadata"
                ],
                srclang: null
            }
        },
        ul: {
            children: [
                "li",
                "script",
                "template",
                "ul",
                "ol"
            ]
        },
        var: O,
        video: {
            attrs: {
                src: null,
                poster: null,
                width: null,
                height: null,
                crossorigin: [
                    "anonymous",
                    "use-credentials"
                ],
                preload: [
                    "auto",
                    "metadata",
                    "none"
                ],
                autoplay: [
                    "autoplay"
                ],
                mediagroup: [
                    "movie"
                ],
                muted: [
                    "muted"
                ],
                controls: [
                    "controls"
                ]
            }
        },
        wbr: O
    }, Ue = {
        accesskey: null,
        class: null,
        contenteditable: g,
        contextmenu: null,
        dir: [
            "ltr",
            "rtl",
            "auto"
        ],
        draggable: [
            "true",
            "false",
            "auto"
        ],
        dropzone: [
            "copy",
            "move",
            "link",
            "string:",
            "file:"
        ],
        hidden: [
            "hidden"
        ],
        id: null,
        inert: [
            "inert"
        ],
        itemid: null,
        itemprop: null,
        itemref: null,
        itemscope: [
            "itemscope"
        ],
        itemtype: null,
        lang: [
            "ar",
            "bn",
            "de",
            "en-GB",
            "en-US",
            "es",
            "fr",
            "hi",
            "id",
            "ja",
            "pa",
            "pt",
            "ru",
            "tr",
            "zh"
        ],
        spellcheck: g,
        autocorrect: g,
        autocapitalize: g,
        style: null,
        tabindex: null,
        title: null,
        translate: [
            "yes",
            "no"
        ],
        rel: [
            "stylesheet",
            "alternate",
            "author",
            "bookmark",
            "help",
            "license",
            "next",
            "nofollow",
            "noreferrer",
            "prefetch",
            "prev",
            "search",
            "tag"
        ],
        role: "alert application article banner button cell checkbox complementary contentinfo dialog document feed figure form grid gridcell heading img list listbox listitem main navigation region row rowgroup search switch tab table tabpanel textbox timer".split(" "),
        "aria-activedescendant": null,
        "aria-atomic": g,
        "aria-autocomplete": [
            "inline",
            "list",
            "both",
            "none"
        ],
        "aria-busy": g,
        "aria-checked": [
            "true",
            "false",
            "mixed",
            "undefined"
        ],
        "aria-controls": null,
        "aria-describedby": null,
        "aria-disabled": g,
        "aria-dropeffect": null,
        "aria-expanded": [
            "true",
            "false",
            "undefined"
        ],
        "aria-flowto": null,
        "aria-grabbed": [
            "true",
            "false",
            "undefined"
        ],
        "aria-haspopup": g,
        "aria-hidden": g,
        "aria-invalid": [
            "true",
            "false",
            "grammar",
            "spelling"
        ],
        "aria-label": null,
        "aria-labelledby": null,
        "aria-level": null,
        "aria-live": [
            "off",
            "polite",
            "assertive"
        ],
        "aria-multiline": g,
        "aria-multiselectable": g,
        "aria-owns": null,
        "aria-posinset": null,
        "aria-pressed": [
            "true",
            "false",
            "mixed",
            "undefined"
        ],
        "aria-readonly": g,
        "aria-relevant": null,
        "aria-required": g,
        "aria-selected": [
            "true",
            "false",
            "undefined"
        ],
        "aria-setsize": null,
        "aria-sort": [
            "ascending",
            "descending",
            "none",
            "other"
        ],
        "aria-valuemax": null,
        "aria-valuemin": null,
        "aria-valuenow": null,
        "aria-valuetext": null
    }, Ge = "beforeunload copy cut dragstart dragover dragleave dragenter dragend drag paste focus blur change click load mousedown mouseenter mouseleave mouseup keydown keyup resize scroll unload".split(" ").map((e)=>"on" + e);
    for (let e of Ge)Ue[e] = null;
    class q {
        constructor(a, l){
            this.tags = Object.assign(Object.assign({}, Xa), a), this.globalAttrs = Object.assign(Object.assign({}, Ue), l), this.allTags = Object.keys(this.tags), this.globalAttrNames = Object.keys(this.globalAttrs);
        }
    }
    q.default = new q;
    function w(e, a, l = e.length) {
        if (!a) return "";
        let r = a.firstChild, t = r && r.getChild("TagName");
        return t ? e.sliceString(t.from, Math.min(t.to, l)) : "";
    }
    function X(e, a = !1) {
        for(; e; e = e.parent)if (e.name == "Element") if (a) a = !1;
        else return e;
        return null;
    }
    function Ne(e, a, l) {
        let r = l.tags[w(e, X(a))];
        return r?.children || l.allTags;
    }
    function L(e, a) {
        let l = [];
        for(let r = X(a); r && !r.type.isTop; r = X(r.parent)){
            let t = w(e, r);
            if (t && r.lastChild.name == "CloseTag") break;
            t && l.indexOf(t) < 0 && (a.name == "EndTag" || a.from >= r.firstChild.to) && l.push(t);
        }
        return l;
    }
    const De = /^[:\-\.\w\u00b7-\uffff]*$/;
    function Se(e, a, l, r, t) {
        let o = /\s*>/.test(e.sliceDoc(t, t + 5)) ? "" : ">", n = X(l, !0);
        return {
            from: r,
            to: t,
            options: Ne(e.doc, n, a).map((s)=>({
                    label: s,
                    type: "type"
                })).concat(L(e.doc, l).map((s, u)=>({
                    label: "/" + s,
                    apply: "/" + s + o,
                    type: "type",
                    boost: 99 - u
                }))),
            validFor: /^\/?[:\-\.\w\u00b7-\uffff]*$/
        };
    }
    function ge(e, a, l, r) {
        let t = /\s*>/.test(e.sliceDoc(r, r + 5)) ? "" : ">";
        return {
            from: l,
            to: r,
            options: L(e.doc, a).map((o, n)=>({
                    label: o,
                    apply: o + t,
                    type: "type",
                    boost: 99 - n
                })),
            validFor: De
        };
    }
    function Ta(e, a, l, r) {
        let t = [], o = 0;
        for (let n of Ne(e.doc, l, a))t.push({
            label: "<" + n,
            type: "type"
        });
        for (let n of L(e.doc, l))t.push({
            label: "</" + n + ">",
            type: "type",
            boost: 99 - o++
        });
        return {
            from: r,
            to: r,
            options: t,
            validFor: /^<\/?[:\-\.\w\u00b7-\uffff]*$/
        };
    }
    function xa(e, a, l, r, t) {
        let o = X(l), n = o ? a.tags[w(e.doc, o)] : null, s = n && n.attrs ? Object.keys(n.attrs) : [], u = n && n.globalAttrs === !1 ? s : s.length ? s.concat(a.globalAttrNames) : a.globalAttrNames;
        return {
            from: r,
            to: t,
            options: u.map((S)=>({
                    label: S,
                    type: "property"
                })),
            validFor: De
        };
    }
    function va(e, a, l, r, t) {
        var o;
        let n = (o = l.parent) === null || o === void 0 ? void 0 : o.getChild("AttributeName"), s = [], u;
        if (n) {
            let S = e.sliceDoc(n.from, n.to), m = a.globalAttrs[S];
            if (!m) {
                let d = X(l), f = d ? a.tags[w(e.doc, d)] : null;
                m = f?.attrs && f.attrs[S];
            }
            if (m) {
                let d = e.sliceDoc(r, t).toLowerCase(), f = '"', c = '"';
                /^['"]/.test(d) ? (u = d[0] == '"' ? /^[^"]*$/ : /^[^']*$/, f = "", c = e.sliceDoc(t, t + 1) == d[0] ? "" : d[0], d = d.slice(1), r++) : u = /^[^\s<>='"]*$/;
                for (let p of m)s.push({
                    label: p,
                    apply: f + p + c,
                    type: "constant"
                });
            }
        }
        return {
            from: r,
            to: t,
            options: s,
            validFor: u
        };
    }
    function _a(e, a) {
        let { state: l, pos: r } = a, t = M(l).resolveInner(r, -1), o = t.resolve(r);
        for(let n = r, s; o == t && (s = t.childBefore(n));){
            let u = s.lastChild;
            if (!u || !u.type.isError || u.from < u.to) break;
            o = t = s, n = u.from;
        }
        return t.name == "TagName" ? t.parent && /CloseTag$/.test(t.parent.name) ? ge(l, t, t.from, r) : Se(l, e, t, t.from, r) : t.name == "StartTag" ? Se(l, e, t, r, r) : t.name == "StartCloseTag" || t.name == "IncompleteCloseTag" ? ge(l, t, r, r) : t.name == "OpenTag" || t.name == "SelfClosingTag" || t.name == "AttributeName" ? xa(l, e, t, t.name == "AttributeName" ? t.from : r, r) : t.name == "Is" || t.name == "AttributeValue" || t.name == "UnquotedAttributeValue" ? va(l, e, t, t.name == "Is" ? r : t.from, r) : a.explicit && (o.name == "Element" || o.name == "Text" || o.name == "Document") ? Ta(l, e, t, r) : null;
    }
    function ka(e) {
        let { extraTags: a, extraGlobalAttributes: l } = e, r = l || a ? new q(a, l) : q.default;
        return (t)=>_a(r, t);
    }
    const Va = B.parser.configure({
        top: "SingleExpression"
    }), Me = [
        {
            tag: "script",
            attrs: (e)=>e.type == "text/typescript" || e.lang == "ts",
            parser: st.parser
        },
        {
            tag: "script",
            attrs: (e)=>e.type == "text/babel" || e.type == "text/jsx",
            parser: it.parser
        },
        {
            tag: "script",
            attrs: (e)=>e.type == "text/typescript-jsx",
            parser: ut.parser
        },
        {
            tag: "script",
            attrs (e) {
                return /^(importmap|speculationrules|application\/(.+\+)?json)$/i.test(e.type);
            },
            parser: Va
        },
        {
            tag: "script",
            attrs (e) {
                return !e.type || /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i.test(e.type);
            },
            parser: B.parser
        },
        {
            tag: "style",
            attrs (e) {
                return (!e.lang || e.lang == "css") && (!e.type || /^(text\/)?(x-)?(stylesheet|css)$/i.test(e.type));
            },
            parser: W.parser
        }
    ], Be = [
        {
            name: "style",
            parser: W.parser.configure({
                top: "Styles"
            })
        }
    ].concat(Ge.map((e)=>({
            name: e,
            parser: B.parser
        }))), je = Pe.define({
        name: "html",
        parser: It.configure({
            props: [
                $e.add({
                    Element (e) {
                        let a = /^(\s*)(<\/)?/.exec(e.textAfter);
                        return e.node.to <= e.pos + a[0].length ? e.continue() : e.lineIndent(e.node.from) + (a[2] ? 0 : e.unit);
                    },
                    "OpenTag CloseTag SelfClosingTag" (e) {
                        return e.column(e.node.from) + e.unit;
                    },
                    Document (e) {
                        if (e.pos + /\s*/.exec(e.textAfter)[0].length < e.node.to) return e.continue();
                        let a = null, l;
                        for(let r = e.node;;){
                            let t = r.lastChild;
                            if (!t || t.name != "Element" || t.to != r.to) break;
                            a = r = t;
                        }
                        return a && !((l = a.lastChild) && (l.name == "CloseTag" || l.name == "SelfClosingTag")) ? e.lineIndent(a.from) + e.unit : null;
                    }
                }),
                we.add({
                    Element (e) {
                        let a = e.firstChild, l = e.lastChild;
                        return !a || a.name != "OpenTag" ? null : {
                            from: a.to,
                            to: l.name == "CloseTag" ? l.from : e.to
                        };
                    }
                }),
                at.add({
                    "OpenTag CloseTag": (e)=>e.getChild("TagName")
                })
            ]
        }),
        languageData: {
            commentTokens: {
                block: {
                    open: "<!--",
                    close: "-->"
                }
            },
            indentOnInput: /^\s*<\/\w+\W$/,
            wordChars: "-._"
        }
    }), k = je.configure({
        wrap: Ye(Me, Be)
    });
    function he(e = {}) {
        let a = "", l;
        e.matchClosingTags === !1 && (a = "noMatch"), e.selfClosingTags === !0 && (a = (a ? a + " " : "") + "selfClosing"), (e.nestedLanguages && e.nestedLanguages.length || e.nestedAttributes && e.nestedAttributes.length) && (l = Ye((e.nestedLanguages || []).concat(Me), (e.nestedAttributes || []).concat(Be)));
        let r = l ? je.configure({
            wrap: l,
            dialect: a
        }) : a ? k.configure({
            dialect: a
        }) : k;
        return new Xe(r, [
            k.data.of({
                autocomplete: ka(e)
            }),
            e.autoCloseTags !== !1 ? Ca : [],
            ct().support,
            wa().support
        ]);
    }
    const Qe = new Set("area base br col command embed frame hr img input keygen link meta param source track wbr menuitem".split(" ")), Ca = y.inputHandler.of((e, a, l, r, t)=>{
        if (e.composing || e.state.readOnly || a != l || r != ">" && r != "/" || !k.isActiveAt(e.state, a, -1)) return !1;
        let o = t(), { state: n } = o, s = n.changeByRange((u)=>{
            var S, m, d;
            let f = n.doc.sliceString(u.from - 1, u.to) == r, { head: c } = u, p = M(n).resolveInner(c, -1), h;
            if (f && r == ">" && p.name == "EndTag") {
                let Q = p.parent;
                if (((m = (S = Q.parent) === null || S === void 0 ? void 0 : S.lastChild) === null || m === void 0 ? void 0 : m.name) != "CloseTag" && (h = w(n.doc, Q.parent, c)) && !Qe.has(h)) {
                    let $ = c + (n.doc.sliceString(c, c + 1) === ">" ? 1 : 0), v = `</${h}>`;
                    return {
                        range: u,
                        changes: {
                            from: c,
                            to: $,
                            insert: v
                        }
                    };
                }
            } else if (f && r == "/" && p.name == "IncompleteCloseTag") {
                let Q = p.parent;
                if (p.from == c - 2 && ((d = Q.lastChild) === null || d === void 0 ? void 0 : d.name) != "CloseTag" && (h = w(n.doc, Q, c)) && !Qe.has(h)) {
                    let $ = c + (n.doc.sliceString(c, c + 1) === ">" ? 1 : 0), v = `${h}>`;
                    return {
                        range: tt.cursor(c + v.length, -1),
                        changes: {
                            from: c,
                            to: $,
                            insert: v
                        }
                    };
                }
            }
            return {
                range: u
            };
        });
        return s.changes.empty ? !1 : (e.dispatch([
            o,
            n.update(s, {
                userEvent: "input.complete",
                scrollIntoView: !0
            })
        ]), !0);
    });
    const Wa = {
        name: "format_html",
        components: {
            DualEditorLayout: lt
        },
        data () {
            return {
                lineWrapping: !1,
                isCompressing: !1,
                isFormatting: !1,
                lineWrappingComp: new ot
            };
        },
        mounted () {
            this.editor_left = new y({
                extensions: [
                    F,
                    he(),
                    K(),
                    this.lineWrappingComp.of(this.lineWrapping ? y.lineWrapping : [])
                ],
                parent: this.$refs.layout.getLeftContainer()
            }), this.editor_right = new y({
                extensions: [
                    F,
                    he(),
                    K(),
                    this.lineWrappingComp.of(this.lineWrapping ? y.lineWrapping : [])
                ],
                parent: this.$refs.layout.getRightContainer()
            }), this.$refs.layout.registerEditors(this.editor_left, this.editor_right);
        },
        methods: {
            handleLineWrappingChange (e) {
                this.lineWrapping = e, this.editor_left.dispatch({
                    effects: this.lineWrappingComp.reconfigure(e ? y.lineWrapping : [])
                }), this.editor_right.dispatch({
                    effects: this.lineWrappingComp.reconfigure(e ? y.lineWrapping : [])
                });
            },
            async compression_html () {
                this.isCompressing = !0;
                try {
                    const { minify: e } = await H(()=>import("./htmlminifier-8e3e67e6.js"), ["assets/htmlminifier-8e3e67e6.js","assets/index-43347b94.js","assets/index-fc27619a.css","assets/index-63909147.js","assets/minify-4fe6a371.js"]), a = await e(this.editor_left.state.doc.toString(), {
                        collapseWhitespace: !0,
                        processScripts: [
                            "application/ld+json"
                        ],
                        minifyJS: !0,
                        minifyCSS: !0
                    });
                    this.editor_right.dispatch({
                        changes: {
                            from: 0,
                            to: this.editor_right.state.doc.length,
                            insert: a
                        }
                    });
                } catch (e) {
                    console.error("请求失败:", e), this.editor_right.dispatch({
                        changes: {
                            from: 0,
                            to: this.editor_right.state.doc.length,
                            insert: "压缩失败，请检查输入的 HTML 语法是否正确"
                        }
                    });
                } finally{
                    this.isCompressing = !1;
                }
            },
            async format_html () {
                this.isFormatting = !0;
                const e = this.editor_left.state.doc.toString();
                try {
                    const a = await H(()=>import("./index-28c5c905.js").then((t)=>t.i), ["assets/index-28c5c905.js","assets/index-43347b94.js","assets/index-fc27619a.css"]), r = (a.default || a).html(e, {
                        indent_size: 4,
                        space_in_empty_paren: !0,
                        indent_inner_html: !0
                    });
                    this.editor_right.dispatch({
                        changes: {
                            from: 0,
                            to: this.editor_right.state.doc.length,
                            insert: r
                        }
                    });
                } catch (a) {
                    console.error("请求失败:", a), this.editor_right.dispatch({
                        changes: {
                            from: 0,
                            to: this.editor_right.state.doc.length,
                            insert: "格式化失败，请检查输入的 HTML 语法"
                        }
                    });
                } finally{
                    this.isFormatting = !1;
                }
            }
        }
    };
    function qa(e, a, l, r, t, o) {
        const n = J("el-button"), s = J("DualEditorLayout");
        return nt(), Ot(s, {
            ref: "layout",
            onLineWrappingChange: o.handleLineWrappingChange
        }, {
            actions: R(()=>[
                    ee(n, {
                        loading: t.isCompressing,
                        onClick: o.compression_html,
                        size: "small",
                        class: "toolbar-btn"
                    }, {
                        default: R(()=>a[0] || (a[0] = [
                                te("压缩HTML")
                            ])),
                        _: 1
                    }, 8, [
                        "loading",
                        "onClick"
                    ]),
                    ee(n, {
                        loading: t.isFormatting,
                        onClick: o.format_html,
                        size: "small",
                        class: "toolbar-btn"
                    }, {
                        default: R(()=>a[1] || (a[1] = [
                                te("格式化HTML")
                            ])),
                        _: 1
                    }, 8, [
                        "loading",
                        "onClick"
                    ])
                ]),
            _: 1
        }, 8, [
            "onLineWrappingChange"
        ]);
    }
    za = rt(Wa, [
        [
            "render",
            qa
        ],
        [
            "__scopeId",
            "data-v-3d57a747"
        ]
    ]);
});
export { za as default, __tla };
