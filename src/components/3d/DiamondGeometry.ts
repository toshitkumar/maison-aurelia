import * as THREE from 'three';

/**
 * Procedural mathematically proportioned 57-facet Round Brilliant Diamond Geometry
 * Table: 56%, Crown Angle: 34.5°, Pavilion Angle: 40.8°, Girdle: 3%
 */
export function createRoundBrilliantDiamondGeometry(): THREE.BufferGeometry {
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];

  const R = 1.0; // Girdle radius
  const tableR = 0.56;
  const tableY = 0.35;
  const starR = 0.74;
  const starY = 0.25;
  const girdleUpperY = 0.03;
  const girdleLowerY = -0.03;
  const pavilionMainR = 0.45;
  const pavilionMainY = -0.48;
  const culetY = -0.86;

  // Helper to add a flat shaded triangle with computed normal
  function addTriangle(
    p1: [number, number, number],
    p2: [number, number, number],
    p3: [number, number, number]
  ) {
    const v1 = new THREE.Vector3(...p1);
    const v2 = new THREE.Vector3(...p2);
    const v3 = new THREE.Vector3(...p3);

    const normal = new THREE.Vector3()
      .crossVectors(v2.clone().sub(v1), v3.clone().sub(v1))
      .normalize();

    positions.push(...p1, ...p2, ...p3);
    normals.push(
      normal.x, normal.y, normal.z,
      normal.x, normal.y, normal.z,
      normal.x, normal.y, normal.z
    );
    uvs.push(0.5, 0.5, 0, 1, 1, 1);
  }

  // 1. Table Facet (Octagon on top)
  const tableCenter: [number, number, number] = [0, tableY, 0];
  const tableVertices: [number, number, number][] = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4;
    tableVertices.push([
      Math.cos(angle) * tableR,
      tableY,
      Math.sin(angle) * tableR,
    ]);
  }
  for (let i = 0; i < 8; i++) {
    const next = (i + 1) % 8;
    addTriangle(tableCenter, tableVertices[i], tableVertices[next]);
  }

  // 2. Star Facets & Bezel (Kite) Facets & Upper Girdle
  // Upper girdle 16 vertices
  const upperGirdleVertices: [number, number, number][] = [];
  for (let i = 0; i < 16; i++) {
    const angle = (i * Math.PI) / 8;
    upperGirdleVertices.push([
      Math.cos(angle) * R,
      girdleUpperY,
      Math.sin(angle) * R,
    ]);
  }

  // Star vertices (8 points between table and upper girdle)
  const starVertices: [number, number, number][] = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4 + Math.PI / 8;
    starVertices.push([
      Math.cos(angle) * starR,
      starY,
      Math.sin(angle) * starR,
    ]);
  }

  // Star triangles
  for (let i = 0; i < 8; i++) {
    const nextTable = (i + 1) % 8;
    addTriangle(tableVertices[i], starVertices[i], tableVertices[nextTable]);
  }

  // Bezel / Kite & Upper Girdle triangles
  for (let i = 0; i < 8; i++) {
    const prevStar = (i + 7) % 8;
    const currStar = i;
    const tablePt = tableVertices[i];
    const ugIndex = i * 2; // Girdle vertex aligned with table vertex
    const ugCenter = upperGirdleVertices[ugIndex];
    const ugLeft = upperGirdleVertices[(ugIndex + 15) % 16];
    const ugRight = upperGirdleVertices[(ugIndex + 1) % 16];

    // Kite facet (Bezel)
    addTriangle(tablePt, starVertices[prevStar], ugLeft);
    addTriangle(tablePt, ugLeft, ugCenter);
    addTriangle(tablePt, ugCenter, ugRight);
    addTriangle(tablePt, ugRight, starVertices[currStar]);
  }

  // 3. Girdle Facets (16 vertical rectangle facets)
  const lowerGirdleVertices: [number, number, number][] = [];
  for (let i = 0; i < 16; i++) {
    const angle = (i * Math.PI) / 8;
    lowerGirdleVertices.push([
      Math.cos(angle) * R,
      girdleLowerY,
      Math.sin(angle) * R,
    ]);
  }
  for (let i = 0; i < 16; i++) {
    const next = (i + 1) % 16;
    addTriangle(
      upperGirdleVertices[i],
      lowerGirdleVertices[i],
      upperGirdleVertices[next]
    );
    addTriangle(
      upperGirdleVertices[next],
      lowerGirdleVertices[i],
      lowerGirdleVertices[next]
    );
  }

  // 4. Pavilion Main Facets & Lower Girdle Facets
  const pavilionMainVertices: [number, number, number][] = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4;
    pavilionMainVertices.push([
      Math.cos(angle) * pavilionMainR,
      pavilionMainY,
      Math.sin(angle) * pavilionMainR,
    ]);
  }

  // Culet
  const culetPoint: [number, number, number] = [0, culetY, 0];

  // Lower girdle triangles
  for (let i = 0; i < 8; i++) {
    const pm = pavilionMainVertices[i];
    const lgIndex = i * 2;
    const lgLeft = lowerGirdleVertices[(lgIndex + 15) % 16];
    const lgCenter = lowerGirdleVertices[lgIndex];
    const lgRight = lowerGirdleVertices[(lgIndex + 1) % 16];

    addTriangle(pm, lgCenter, lgLeft);
    addTriangle(pm, lgRight, lgCenter);
  }

  // Pavilion mains to culet
  for (let i = 0; i < 8; i++) {
    const next = (i + 1) % 8;
    addTriangle(pavilionMainVertices[i], culetPoint, pavilionMainVertices[next]);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));

  return geometry;
}

/**
 * Creates individual deconstructed layers for Section 2 (Craftsmanship explosion)
 */
export function createDeconstructedDiamondLayers() {
  const R = 1.0;
  const tableR = 0.56;
  const tableY = 0.35;
  const starR = 0.74;
  const starY = 0.25;
  const girdleUpperY = 0.03;
  const girdleLowerY = -0.03;
  const pavilionMainR = 0.45;
  const pavilionMainY = -0.48;
  const culetY = -0.86;

  function makeHelper() {
    const pos: number[] = [];
    const norm: number[] = [];
    function addTri(
      p1: [number, number, number],
      p2: [number, number, number],
      p3: [number, number, number]
    ) {
      const v1 = new THREE.Vector3(...p1);
      const v2 = new THREE.Vector3(...p2);
      const v3 = new THREE.Vector3(...p3);
      const normal = new THREE.Vector3()
        .crossVectors(v2.clone().sub(v1), v3.clone().sub(v1))
        .normalize();
      pos.push(...p1, ...p2, ...p3);
      norm.push(
        normal.x, normal.y, normal.z,
        normal.x, normal.y, normal.z,
        normal.x, normal.y, normal.z
      );
    }
    return { pos, norm, addTri };
  }

  // 1. Table Layer
  const tableH = makeHelper();
  const tableCenter: [number, number, number] = [0, tableY, 0];
  const tableVertices: [number, number, number][] = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4;
    tableVertices.push([
      Math.cos(angle) * tableR,
      tableY,
      Math.sin(angle) * tableR,
    ]);
  }
  for (let i = 0; i < 8; i++) {
    tableH.addTri(tableCenter, tableVertices[i], tableVertices[(i + 1) % 8]);
  }
  const tableGeo = new THREE.BufferGeometry();
  tableGeo.setAttribute('position', new THREE.Float32BufferAttribute(tableH.pos, 3));
  tableGeo.setAttribute('normal', new THREE.Float32BufferAttribute(tableH.norm, 3));

  // 2. Crown Layer (Stars & Bezels)
  const crownH = makeHelper();
  const upperGirdleVertices: [number, number, number][] = [];
  for (let i = 0; i < 16; i++) {
    const angle = (i * Math.PI) / 8;
    upperGirdleVertices.push([
      Math.cos(angle) * R,
      girdleUpperY,
      Math.sin(angle) * R,
    ]);
  }
  const starVertices: [number, number, number][] = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4 + Math.PI / 8;
    starVertices.push([
      Math.cos(angle) * starR,
      starY,
      Math.sin(angle) * starR,
    ]);
  }
  for (let i = 0; i < 8; i++) {
    crownH.addTri(tableVertices[i], starVertices[i], tableVertices[(i + 1) % 8]);
  }
  for (let i = 0; i < 8; i++) {
    const prevStar = (i + 7) % 8;
    const currStar = i;
    const tablePt = tableVertices[i];
    const ugIndex = i * 2;
    const ugCenter = upperGirdleVertices[ugIndex];
    const ugLeft = upperGirdleVertices[(ugIndex + 15) % 16];
    const ugRight = upperGirdleVertices[(ugIndex + 1) % 16];

    crownH.addTri(tablePt, starVertices[prevStar], ugLeft);
    crownH.addTri(tablePt, ugLeft, ugCenter);
    crownH.addTri(tablePt, ugCenter, ugRight);
    crownH.addTri(tablePt, ugRight, starVertices[currStar]);
  }
  const crownGeo = new THREE.BufferGeometry();
  crownGeo.setAttribute('position', new THREE.Float32BufferAttribute(crownH.pos, 3));
  crownGeo.setAttribute('normal', new THREE.Float32BufferAttribute(crownH.norm, 3));

  // 3. Girdle Layer (Ring cylinder band)
  const girdleH = makeHelper();
  const lowerGirdleVertices: [number, number, number][] = [];
  for (let i = 0; i < 16; i++) {
    const angle = (i * Math.PI) / 8;
    lowerGirdleVertices.push([
      Math.cos(angle) * R,
      girdleLowerY,
      Math.sin(angle) * R,
    ]);
  }
  for (let i = 0; i < 16; i++) {
    const next = (i + 1) % 16;
    girdleH.addTri(
      upperGirdleVertices[i],
      lowerGirdleVertices[i],
      upperGirdleVertices[next]
    );
    girdleH.addTri(
      upperGirdleVertices[next],
      lowerGirdleVertices[i],
      lowerGirdleVertices[next]
    );
  }
  const girdleGeo = new THREE.BufferGeometry();
  girdleGeo.setAttribute('position', new THREE.Float32BufferAttribute(girdleH.pos, 3));
  girdleGeo.setAttribute('normal', new THREE.Float32BufferAttribute(girdleH.norm, 3));

  // 4. Pavilion Layer (Cone & lower facets)
  const pavilionH = makeHelper();
  const pavilionMainVertices: [number, number, number][] = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4;
    pavilionMainVertices.push([
      Math.cos(angle) * pavilionMainR,
      pavilionMainY,
      Math.sin(angle) * pavilionMainR,
    ]);
  }
  const culetPoint: [number, number, number] = [0, culetY + 0.05, 0];
  for (let i = 0; i < 8; i++) {
    const pm = pavilionMainVertices[i];
    const lgIndex = i * 2;
    const lgLeft = lowerGirdleVertices[(lgIndex + 15) % 16];
    const lgCenter = lowerGirdleVertices[lgIndex];
    const lgRight = lowerGirdleVertices[(lgIndex + 1) % 16];

    pavilionH.addTri(pm, lgCenter, lgLeft);
    pavilionH.addTri(pm, lgRight, lgCenter);
  }
  for (let i = 0; i < 8; i++) {
    pavilionH.addTri(pavilionMainVertices[i], culetPoint, pavilionMainVertices[(i + 1) % 8]);
  }
  const pavilionGeo = new THREE.BufferGeometry();
  pavilionGeo.setAttribute('position', new THREE.Float32BufferAttribute(pavilionH.pos, 3));
  pavilionGeo.setAttribute('normal', new THREE.Float32BufferAttribute(pavilionH.norm, 3));

  // 5. Culet point tip
  const culetH = makeHelper();
  const culetTip: [number, number, number] = [0, culetY, 0];
  const culetRing: [number, number, number][] = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4;
    culetRing.push([
      Math.cos(angle) * 0.06,
      culetY + 0.05,
      Math.sin(angle) * 0.06,
    ]);
  }
  for (let i = 0; i < 8; i++) {
    culetH.addTri(culetTip, culetRing[i], culetRing[(i + 1) % 8]);
  }
  const culetGeo = new THREE.BufferGeometry();
  culetGeo.setAttribute('position', new THREE.Float32BufferAttribute(culetH.pos, 3));
  culetGeo.setAttribute('normal', new THREE.Float32BufferAttribute(culetH.norm, 3));

  return {
    table: tableGeo,
    crown: crownGeo,
    girdle: girdleGeo,
    pavilion: pavilionGeo,
    culet: culetGeo,
  };
}
