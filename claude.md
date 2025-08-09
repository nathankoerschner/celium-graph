## **Prompt for Building the Mycelium-Themed Org Chart Graph**

> You are building a **standalone, React-based interactive organizational graph** with **mycelium-inspired visual design**.
>
> The graph has two main types of nodes:
>
> - **Person Nodes**: Represent individual members of the organization.
> - **Department Nodes**: Represent business functions or departments.
>
> The application’s **branding is mycelium-related**, so the visuals should draw inspiration from organic, branching network structures.
>
> The larger app collects **personality and psychology test results** from users (Myers-Briggs, OCEAN, Enneagram), so you can use that data to influence the appearance, grouping, and relationships of nodes.
>
> Requirements:
>
> - Build using **React** with common, well-maintained libraries (e.g., `react-force-graph`, `d3`, `react-three-fiber` if 3D is desired).
> - Graph must be interactive: users can **click and drag** to move around, click nodes to reveal details (name, role, test results).
> - Support a **dark background** with high-contrast text and visually distinctive lines.
> - Nodes should be **spaced out**, small, and color-filled, with department nodes visually distinct.
> - Users should be able to zoom and pan.
> - Edges (connections) should be meaningful and potentially animated.
> - Structure: department nodes connect to their respective people; people can also have connections to other people.
>
> Deliverables:
>
> - React component with data-driven rendering.
> - JSON format for node and edge data.
> - Example dataset for demonstration.
> - Styles that reinforce the **mycelium network** brand identity.

---

## **Plan for Development**

### 1. **Define Data Structure**

```json
{
  "nodes": [
    { "id": "1", "type": "person", "name": "Alice", "role": "Engineer", "mbti": "INTJ", "ocean": { "openness": 0.8 }, "enneagram": "5w4" },
    { "id": "2", "type": "department", "name": "Engineering" }
  ],
  "links": [
    { "source": "1", "target": "2", "relation": "belongs-to" },
    { "source": "1", "target": "3", "relation": "high-openness-similarity" }
  ]
}
2. Graph Library Choice
2D Option: react-force-graph (good balance of flexibility and simplicity).

3D Option: react-force-graph-3d or react-three-fiber for immersive layouts.

Animation: Use link curvature, pulsing lines, or gradient edges to represent different relationships.

3. Node Types
Person Nodes: Circular or organic shapes, colored according to department or personality trait.

Department Nodes: Larger or differently shaped (e.g., hexagon), placed centrally with people radiating outward.

4. Edge Meaning Suggestions
Given you have personality test data, lines between individual nodes could represent:

Shared Department – solid straight lines (already given by department-node link).

Personality Similarity – gradient or color-coded lines based on MBTI/OCEAN score similarity.

Complementary Traits – dotted lines showing differences that balance a team (e.g., introvert–extrovert pairing).

Enneagram Compatibility – slightly curved lines with thickness based on compatibility score.

Collaboration Frequency – animated pulsing lines (faster pulse = more collaboration).

5. Styling & Branding
Mycelium Theme:

Edges slightly “branch” or “fork” visually.

Soft glowing edges with slight randomness in thickness to mimic organic growth.

Department nodes act like “hubs” (akin to mycelium nutrient sources).

Dark Background: Deep charcoal or navy; neon-like node and edge colors.

6. Interactivity
Click Node: Open side panel or tooltip with full details (role, department, test scores).

Hover Edge: Show reason for connection (e.g., “85% MBTI similarity”).

Drag to Reposition: Maintain force-directed physics.

7. Implementation Steps
Scaffold project with create-react-app or Vite.

Install chosen graph library (react-force-graph).

Set up JSON dataset for testing.

Implement force-directed graph layout with node/edge styling.

Add click/hover interactions.

Apply mycelium-inspired visual effects (glow, branching, organic curves).

Test with example personality datasets.
```
