-- Audit: legacy shape-type usage in projects.layers
--
-- Run against the shared Supabase project (ttalbvgdxtnyppighwgf) before
-- landing Stage G of the asset-based-shapes rebuild. Stage G deletes the
-- legacy render branches for `astrology`, `amino`, `iching_lines`, and
-- `custom`; that deletion is safe only when the live data has no rows
-- still referencing those types.
--
-- Every row in `projects` stores the project tree inside `data` (jsonb).
-- The layer array lives at `data -> 'layers'`, each element with a
-- `type` string. We also have to handle group layers — they don't
-- carry these types, but their children do, and those children are
-- stored in the same flat array.
--
-- 1) Count rows that still contain at least one legacy layer, broken out
--    by type. Expected result after Stage F has rolled out to every user:
--    zero rows for astrology / amino / iching_lines. `custom` may still
--    be non-zero until its dedicated migration runs.
SELECT
    CASE
        WHEN EXISTS (
            SELECT 1 FROM jsonb_array_elements(p.data -> 'layers') l
            WHERE l ->> 'type' = 'astrology'
        ) THEN 'astrology'
        WHEN EXISTS (
            SELECT 1 FROM jsonb_array_elements(p.data -> 'layers') l
            WHERE l ->> 'type' = 'amino'
        ) THEN 'amino'
        WHEN EXISTS (
            SELECT 1 FROM jsonb_array_elements(p.data -> 'layers') l
            WHERE l ->> 'type' = 'iching_lines'
        ) THEN 'iching_lines'
        WHEN EXISTS (
            SELECT 1 FROM jsonb_array_elements(p.data -> 'layers') l
            WHERE l ->> 'type' = 'custom'
        ) THEN 'custom'
    END AS legacy_type,
    count(*) AS project_count
FROM projects p
WHERE EXISTS (
    SELECT 1 FROM jsonb_array_elements(p.data -> 'layers') l
    WHERE l ->> 'type' IN ('astrology', 'amino', 'iching_lines', 'custom')
)
GROUP BY 1
ORDER BY 1;

-- 2) Per-project drilldown: shows owning user, project id/name, and the
--    legacy types present. Use this to identify any stragglers that
--    haven't been opened in v2 yet (Stage F only migrates on load).
SELECT
    p.id AS project_id,
    p.user_id,
    p.name,
    p.schema_version,
    array_agg(DISTINCT l.value ->> 'type') FILTER (
        WHERE l.value ->> 'type' IN ('astrology', 'amino', 'iching_lines', 'custom')
    ) AS legacy_types,
    p.updated_at
FROM projects p,
     jsonb_array_elements(p.data -> 'layers') l
WHERE l.value ->> 'type' IN ('astrology', 'amino', 'iching_lines', 'custom')
GROUP BY p.id, p.user_id, p.name, p.schema_version, p.updated_at
ORDER BY p.updated_at DESC;

-- 3) Sanity check against total project count, so we can reason about
--    what fraction is still on legacy types.
SELECT
    (SELECT count(*) FROM projects) AS total_projects,
    (
        SELECT count(DISTINCT p.id)
        FROM projects p,
             jsonb_array_elements(p.data -> 'layers') l
        WHERE l.value ->> 'type' IN ('astrology', 'amino', 'iching_lines')
    ) AS projects_with_astro_amino_iching,
    (
        SELECT count(DISTINCT p.id)
        FROM projects p,
             jsonb_array_elements(p.data -> 'layers') l
        WHERE l.value ->> 'type' = 'custom'
    ) AS projects_with_custom;
