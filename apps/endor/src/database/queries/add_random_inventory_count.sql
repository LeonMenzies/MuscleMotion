UPDATE ProductInventories
INNER JOIN Sizes ON ProductInventories.sizeId = Sizes.id
SET count = CASE
    WHEN Sizes.name IN ('xxxs', 'xxs', 'xxl', 'xxxl', '0', '2', '18', '20') THEN FLOOR(RAND() * 20)
    WHEN Sizes.name IN ('xs', 'xl', '14', '16') THEN FLOOR(RAND() * 20) + 30 
    ELSE FLOOR(RAND() * 60) + 40 
END
WHERE ProductInventories.ID > 0;