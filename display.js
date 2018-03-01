        function createBoard(data) {
            const fields = {};
            data.forEach(d => fields[d.id] = `<span class='field' id='${d.id}'>${d.state}</span>`)

            const board =
                `${fields.f11}-----------${fields.f14}-----------${fields.f17}
|           |           |
|  ${fields.f22}--------${fields.f24}--------${fields.f26}  |
|  |        |        |  |
|  |  ${fields.f33}-----${fields.f34}-----${fields.f35}  |  |
|  |  |           |  |  |
${fields.f41}--${fields.f42}--${fields.f43}           ${fields.f45}--${fields.f46}--${fields.f47}
|  |  |           |  |  |
|  |  ${fields.f53}-----${fields.f54}-----${fields.f55}  |  |
|  |        |        |  |
|  ${fields.f62}--------${fields.f64}--------${fields.f66}  |
|           |           |
${fields.f71}-----------${fields.f74}-----------${fields.f77}`;
            return board;
        }

