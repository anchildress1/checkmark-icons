# Diagram Format Support & AI Integration Summary

This summary compares major diagram formats (Mermaid, PlantUML, Graphviz/DOT, and D2) across IDEs, VCS platforms, and AI assistants, highlighting native support and readiness for AI-driven workflows.

---

## 🧩 A) Diagram Formats × IDEs/VCS

| **Format** | **VS Code** | **JetBrains** | **Windsurf / Cascade** | **Cursor** | **Cody (Sourcegraph)** | **Xcode** | **Eclipse** | **GitHub** | **GitLab** | **Bitbucket** |
|:--|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| **Mermaid** | ⚙️ | ⚙️ | ✅ | ⚙️ | ⚙️ | ❌ | ❌ | ✅ | ✅ | ❌ |
| **PlantUML** | ⚙️ | ⚙️ | ⚙️ | ⚙️ | ⚙️ | ⚙️ | ⚙️ | ❌ | ✅ | ❌ |
| **Graphviz (DOT)** | ⚙️ | ⚙️ | ⚙️/❌ | ⚙️ | ⚙️ | ❌ | ⚙️ | ❌ | ✅ | ❌ |
| **D2** | ⚙️ | ⚙️ | ❌/⚙️ | ⚙️ | ⚙️ | ❌ | ❌ | ❌ | ❌ | ❌ |

✅ = native | ⚙️ = plugin/ext required | ❌ = unsupported | ❓ = unclear

---

## 🤖 B) AI Models / Assistants × Diagram DSLs

| **AI Assistant** | **Mermaid** (Gen / Understand / Render) | **PlantUML** (Gen / Understand / Render) | **Graphviz/DOT** (Gen / Understand / Render) | **D2** (Gen / Understand / Render) |
|:--|:--:|:--:|:--:|:--:|
| **ChatGPT (GPT-4/4o)** | ✅ / ✅ / ⚙️ | ✅ / ✅ / ⚙️ | ✅ / ✅ / ⚙️ | ⚙️ / ✅ / ⚙️ |
| **Claude 3.5** | ✅ / ✅ / ⚙️ | ✅ / ✅ / ⚙️ | ✅ / ✅ / ⚙️ | ⚙️ / ✅ / ⚙️ |
| **Gemini 1.5** | ✅ / ✅ / ⚙️ | ✅ / ✅ / ⚙️ | ✅ / ✅ / ⚙️ | ⚙️ / ✅ / ⚙️ |
| **Copilot Chat (IDE)** | ✅ / ✅ / ⚙️ | ✅ / ✅ / ⚙️ | ✅ / ✅ / ⚙️ | ⚙️ / ✅ / ⚙️ |
| **Windsurf Cascade** | ✅ / ✅ / ✅ | ✅ / ✅ / ⚙️ | ✅ / ✅ / ⚙️ | ⚙️ / ✅ / ⚙️ |
| **Sourcegraph Cody** | ✅ / ✅ / ⚙️ | ✅ / ✅ / ⚙️ | ✅ / ✅ / ⚙️ | ⚙️ / ✅ / ⚙️ |
| **Cursor IDE** | ✅ / ✅ / ⚙️ | ✅ / ✅ / ⚙️ | ✅ / ✅ / ⚙️ | ⚙️ / ✅ / ⚙️ |
| **Llama 3.x / Mistral Large** | ✅ / ✅ / ⚙️ | ✅ / ⚙️ / ⚙️ | ✅ / ⚙️ / ⚙️ | ⚙️ / ⚙️ / ⚙️ |

✅ = native / reliable | ⚙️ = possible but needs setup | ❌ = not supported

---

## 📊 C) Pros / Cons (AI Understanding Included)

**Mermaid**  
- **Pros:** Easiest round-trip for AI workflows — assistants generate and read it fluently; GitHub/GitLab render it natively; minimal setup.  
- **Cons:** Limited layout control; needs previewer in IDEs; large graphs can be slow.

**PlantUML**  
- **Pros:** Full UML coverage; deep syntax for formal modeling; LLMs handle it well for structured diagrams.  
- **Cons:** Needs Java/Graphviz; no native GitHub support; higher friction for AI-driven updates.

**Graphviz (DOT)**  
- **Pros:** Perfect for dependency maps; precise layouts; widely supported in automation.  
- **Cons:** Low-level; limited semantics; visual output requires renderers; weak real-time AI loops.

**D2**  
- **Pros:** Modern, readable syntax; AI-friendly for quick drafts; great for automation in the future.  
- **Cons:** Limited platform support; newer syntax means LLMs can misinterpret structures.

---

## 🧠 D) Key Takeaways

- **Mermaid is the best balance** — fully supported by GitHub and understood by all major AI models for fast “edit → AI → render” loops.
- **PlantUML** remains best for **formal UML or enterprise documentation**, but adds setup overhead.
- **Graphviz/DOT** and **D2** serve niche or future-forward use cases — worth monitoring for expansion.

---

### ✅ Recommendation
Use **Mermaid** as the default diagram format for the GitHub `speckit` repository. It offers instant rendering, cross-AI comprehension, and seamless CI/CD documentation integration. Keep **PlantUML** as an optional advanced format for teams needing formal architecture diagrams.

