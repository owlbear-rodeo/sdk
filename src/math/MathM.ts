import { toDegrees, toRadians } from "../common/number";
import { Matrix } from "../types/Matrix";
import { Vector2 } from "../types/Vector2";
import { Item } from "../types/items/Item";

/**
 * Math class for a 2D transformation Matrix
 * @example Find the relative transform between two items
 * ```ts
 * const a = buildShape().build();
 * const b = buildShape().build();
 *
 * const aTransform = MathM.fromItem(a);
 * const bTransform = MathM.fromItem(b);
 *
 * const invATransform = MathM.inverse(aTransform);
 * const relativeBTransform = MathM.multiply(invATransform, bTransform);
 * ```
 * @example Find the world position of a line's `startPosition`
 * ```ts
 * const line = buildLine().build();
 *
 * const lineTransform = MathM.fromItem(line);
 * const startTransform = MathM.fromPosition(line.startPosition);
 *
 * const worldTransform = MathM.multiply(lineTransform, startTransform);
 *
 * const worldPosition = MathM.decompose(worldTransform).position;
 * ```
 */
export class MathM {
  /**
   * @returns The inverse of the given `matrix`
   */
  static inverse(matrix: Matrix): Matrix {
    const [m1, m2, m3, m4, m5, m6, m7, m8, m9] = matrix;
    const det =
      m1 * (m5 * m9 - m8 * m6) -
      m2 * (m4 * m9 - m6 * m7) +
      m3 * (m4 * m8 - m5 * m7);

    if (Math.abs(det) < 1e-14) {
      return matrix;
    }

    const invdet = 1 / det;

    const im1 = (m5 * m9 - m8 * m6) * invdet;
    const im2 = (m3 * m8 - m2 * m9) * invdet;
    const im3 = (m2 * m6 - m3 * m5) * invdet;
    const im4 = (m6 * m7 - m4 * m9) * invdet;
    const im5 = (m1 * m9 - m3 * m7) * invdet;
    const im6 = (m4 * m3 - m1 * m6) * invdet;
    const im7 = (m4 * m8 - m7 * m5) * invdet;
    const im8 = (m7 * m2 - m1 * m8) * invdet;
    const im9 = (m1 * m5 - m4 * m2) * invdet;

    return [im1, im2, im3, im4, im5, im6, im7, im8, im9];
  }

  /**
   * @returns `a` multiplied by `b`
   */
  static multiply(a: Matrix, b: Matrix): Matrix {
    return [
      a[0] * b[0] + a[1] * b[3] + a[2] * b[6],
      a[0] * b[1] + a[1] * b[4] + a[2] * b[7],
      a[0] * b[2] + a[1] * b[5] + a[2] * b[8],

      a[3] * b[0] + a[4] * b[3] + a[5] * b[6],
      a[3] * b[1] + a[4] * b[4] + a[5] * b[7],
      a[3] * b[2] + a[4] * b[5] + a[5] * b[8],

      a[6] * b[0] + a[7] * b[3] + a[8] * b[6],
      a[6] * b[1] + a[7] * b[4] + a[8] * b[7],
      a[6] * b[2] + a[7] * b[5] + a[8] * b[8],
    ];
  }

  /**
   * Create a new transformation matrix from a position
   */
  static fromPosition(position: Vector2): Matrix {
    return [1, 0, position.x, 0, 1, position.y, 0, 0, 1];
  }

  /**
   * Create a new transformation matrix from a rotation
   * @param rotation - rotation in degrees
   */
  static fromRotation(rotation: number): Matrix {
    const r = toRadians(rotation);
    return [Math.cos(r), -Math.sin(r), 0, Math.sin(r), Math.cos(r), 0, 0, 0, 1];
  }

  /**
   * Create a new transformation matrix from a scale
   */
  static fromScale(scale: Vector2): Matrix {
    return [scale.x, 0, 0, 0, scale.y, 0, 0, 0, 1];
  }

  static fromItem(item: Item): Matrix {
    const t = MathM.fromPosition(item.position);
    const s = MathM.fromScale(item.scale);
    const r = MathM.fromRotation(item.rotation);

    return MathM.multiply(MathM.multiply(t, r), s);
  }

  /**
   * Decompose matrix into its individual parts
   * Adapted from @link https://frederic-wang.fr/decomposition-of-2d-transform-matrices.html
   */
  static decompose(matrix: Matrix): {
    position: Vector2;
    scale: Vector2;
    /** Rotation in degrees */
    rotation: number;
  } {
    const [m1, m2, m3, m4, m5, m6] = matrix;
    const delta = m1 * m5 - m4 * m2;

    const result = {
      position: { x: m3, y: m6 },
      rotation: 0,
      scale: { x: 1, y: 1 },
    };

    // Apply the QR-like decomposition.
    if (m1 != 0 || m4 != 0) {
      var r = Math.sqrt(m1 * m1 + m4 * m4);
      result.rotation = m4 > 0 ? Math.acos(m1 / r) : -Math.acos(m1 / r);
      result.scale = { x: r, y: delta / r };
    } else if (m2 != 0 || m5 != 0) {
      var s = Math.sqrt(m2 * m2 + m5 * m5);
      result.rotation =
        Math.PI / 2 - (m5 > 0 ? Math.acos(-m2 / s) : -Math.acos(m2 / s));
      result.scale = { x: delta / s, y: s };
    } else {
      // a = b = c = d = 0
    }

    result.rotation = toDegrees(result.rotation);

    return result;
  }
}
