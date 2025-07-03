"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var blogPosts = [
    {
        trendingKeyword: 'INTJ Careers',
        title: 'INTJ Careers: 7 Perfect Paths for the Strategic Architect',
        content: "\n      <h4>Unlocking the Potential of the INTJ Mind</h4>\n      <p>INTJ, known as \"The Architect\" or \"The Mastermind,\" is one of the rarest and most strategically capable personality types. Driven by logic, a thirst for knowledge, and a desire to improve complex systems, INTJs thrive in environments that challenge their intellect and allow them to work autonomously. But which careers truly harness their unique strengths?</p>\n      <p>If you're an INTJ, you're likely not looking for just a job; you're looking for a mission. You want to solve complex problems and build a legacy. Here are 7 career paths that are perfectly suited for the INTJ personality type.</p>\n      \n      <h5>1. Software Developer / Architect</h5>\n      <p>It's no surprise that technology is a natural home for INTJs. The world of software development is a giant puzzle box. It requires logic, systems thinking, and the ability to build intricate structures from the ground up\u2014all activities that energize the INTJ.</p>\n      \n      <h5>2. Management Consultant</h5>\n      <p>Consulting firms are hired to solve a company's most challenging problems. INTJs excel at dissecting a complex business issue, identifying inefficiencies, and designing a new, improved strategy. The project-based nature of the work also provides the variety and intellectual stimulation they crave.</p>\n\n      <h5>3. Scientist / Researcher</h5>\n      <p>The relentless pursuit of knowledge is at the core of the INTJ personality. A career in scientific research allows them to dive deep into a chosen field, from physics to biology, formulating theories and running experiments to uncover objective truths.</p>\n\n      <h5>4. Lawyer / Judge</h5>\n      <p>The legal field is a complex system of rules and logic. INTJs are adept at navigating this system, building logical arguments, and applying principles impartially. Roles like corporate law, intellectual property, or even becoming a judge align well with their objective and strategic nature.</p>\n\n      <h5>5. Engineer (Civil, Mechanical, Aerospace)</h5>\n      <p>Like software, physical engineering is about designing and building efficient systems. Whether it's a bridge, a new engine, or a spacecraft, INTJs can use their foresight and planning skills to manage complex projects from concept to completion.</p>\n\n      <h5>6. University Professor</h5>\n      <p>For the INTJ who loves their subject matter, academia can be a perfect fit. It provides a platform to become a master in their field, conduct research, and mentor the next generation of thinkers\u2014all on their own terms.</p>\n\n      <h5>7. Financial Strategist / Analyst</h5>\n      <p>The stock market and financial world are complex, data-driven systems. INTJs can use their analytical skills to spot trends, build investment models, and make calculated decisions, removing emotion from the equation.</p>\n    ",
        sourceUrl: 'https://mbti16personalities.online/blog/intj-careers',
        imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        locale: 'en',
    },
    {
        trendingKeyword: 'INFP INFJ Compatibility',
        title: 'INFP and INFJ Compatibility: A Deep and Complex Connection',
        content: "\n      <h4>A Meeting of Idealistic Minds</h4>\n      <p>When an INFP (The Mediator) and an INFJ (The Advocate) cross paths, it can feel like a meeting of kindred spirits. Both are introverted, intuitive, feeling types who share a deep inner world and a powerful desire to live a life aligned with their values. This shared foundation can lead to a relationship of incredible depth and understanding.</p>\n      <p>But what makes this pairing work so well, and what are the potential challenges to watch out for? Let's dive into the dynamics of INFP and INFJ compatibility.</p>\n      \n      <h5>What They Share: A Common Ground</h5>\n      <ul>\n        <li><strong>Shared Values:</strong> Both types are idealists who care deeply about authenticity, personal growth, and making the world a better place. They can spend hours discussing their dreams, philosophies, and the meaning of life.</li>\n        <li><strong>Intuitive Communication:</strong> As \"N\" types, they communicate in a similar abstract and metaphorical way. They can often understand each other's complex thoughts and feelings without needing to spell everything out.</li>\n        <li><strong>Emotional Depth:</strong> Both are \"F\" types, prioritizing harmony and emotional connection. They are sensitive to each other's needs and can provide a safe space for vulnerability.</li>\n      </ul>\n\n      <h5>The Key Difference: P vs. J</h5>\n      <p>The biggest difference lies in their last letter: Perceiving (P) vs. Judging (J). This is the source of both synergy and potential friction.</p>\n      <ul>\n        <li><strong>INFP (Perceiving):</strong> Flexible, spontaneous, and resistant to being boxed in. They like to keep their options open and can be indecisive, preferring to go with the flow.</li>\n        <li><strong>INFJ (Judging):</strong> Organized, decisive, and likes to have a plan. They feel more secure when decisions are made and they have a clear path forward.</li>\n      </ul>\n\n      <h5>Tips for a Thriving INFP-INFJ Relationship</h5>\n      <ol>\n        <li><strong>Appreciate the Differences:</strong> Recognize that the J/P difference is a source of balance.</li>\n        <li><strong>Communicate About Needs:</strong> The INFJ needs to express their desire for a plan without making demands. The INFP needs to communicate their need for freedom.</li>\n        <li><strong>Give Each Other Space:</strong> Both are introverts and need significant alone time to recharge.</li>\n        <li><strong>Work Together on Goals:</strong> Combine the INFJ's planning skills with the INFP's creative brainstorming.</li>\n      </ol>\n\n      <h5>Conclusion: A Rare and Rewarding Bond</h5>\n      <p>The INFP and INFJ pairing is one of the most profound and intellectually stimulating in the MBTI world. While navigating the P vs. J difference requires patience and communication, the shared values and deep emotional connection make it a bond well worth nurturing.</p>\n    ",
        sourceUrl: 'https://mbti16personalities.online/blog/infp-infj-compatibility',
        imageUrl: 'https://images.unsplash.com/photo-1505526543118-2469491CFde1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        locale: 'en',
    },
];
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, blogPosts_1, post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Starting to seed blog posts...');
                    _i = 0, blogPosts_1 = blogPosts;
                    _a.label = 1;
                case 1:
                    if (!(_i < blogPosts_1.length)) return [3 /*break*/, 4];
                    post = blogPosts_1[_i];
                    return [4 /*yield*/, prisma.blog.upsert({
                            where: { sourceUrl: post.sourceUrl },
                            update: post,
                            create: post,
                        })];
                case 2:
                    _a.sent();
                    console.log("Upserted post: ".concat(post.title));
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    console.log('Seeding finished.');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
