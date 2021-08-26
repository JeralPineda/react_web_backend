const { response } = require('express');

const Menu = require('../models/menu');

const addMenu = async (req, res = response) => {
   const { title, url, order, active } = req.body;
   try {
      const data = {
         title,
         url,
         order,
         active,
      };

      let menu = new Menu(data);

      if (!menu) {
         return res.status(400).json({
            msg: 'No se pudo crear el menu',
         });
      }

      //   guardamos en la base de datos
      await menu.save();

      res.json({
         msg: 'Menu creado correctamente',
      });
   } catch (error) {
      console.log(error);

      res.status(500).json({
         msg: 'Hable con el administrador',
      });
   }
};

const getMenus = async (req, res = response) => {
   try {
      const menu = await Menu.find().sort({ order: 'asc' });

      if (!menu) {
         return res.status(400).json({
            msg: 'No se ha encontrado ningún elemento en el menu',
         });
      }

      res.json({
         menu,
      });
   } catch (error) {
      console.log(error);

      res.status(500).json({
         msg: 'Hable con el administrador',
      });
   }
};

const updateMenu = async (req, res = response) => {
   let menuData = req.body;
   const { id } = req.params;

   try {
      const menu = await Menu.findByIdAndUpdate(id, menuData);

      if (!menu) {
         return res.status(400).json({
            ok: false,
            msg: 'No se ha encontrado ningún menu',
         });
      }

      res.json({
         ok: true,
         msg: 'Menu actualizado correctamente',
      });
   } catch (error) {
      console.log(error);

      res.status(500).json({
         msg: 'Hable con el administrador',
      });
   }
};

const activateMenu = async (req, res = response) => {
   const { id } = req.params;
   const { active } = req.body;

   try {
      const menu = await Menu.findByIdAndUpdate(id, { active });

      if (!menu) {
         return res.status(400).json({
            ok: false,
            msg: 'No se ha encontrado ningún menu',
         });
      }

      if (!active) {
         return res.json({
            ok: true,
            msg: 'Menu desactivado correctamente',
         });
      }

      res.json({
         ok: true,
         msg: 'Menu activado correctamente',
      });
   } catch (error) {
      console.log(error);

      res.status(500).json({
         msg: 'Hable con el administrador',
      });
   }
};

module.exports = {
   addMenu,
   getMenus,
   updateMenu,
   activateMenu,
};
