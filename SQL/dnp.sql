SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';

DROP SCHEMA IF EXISTS `dnp` ;
CREATE SCHEMA IF NOT EXISTS `dnp` DEFAULT CHARACTER SET latin1 ;
USE `dnp` ;

-- -----------------------------------------------------
-- Table `dnp`.`Login`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dnp`.`Login` ;

CREATE  TABLE IF NOT EXISTS `dnp`.`Login` (
  `IdLogin` INT(11) NOT NULL AUTO_INCREMENT ,
  `Usuario` VARCHAR(50) NOT NULL ,
  `Clave` VARCHAR(50) NOT NULL ,
  `Estado` VARCHAR(45) NOT NULL ,
  PRIMARY KEY (`IdLogin`) ,
  UNIQUE INDEX `User` (`Usuario` ASC) )
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `dnp`.`Departamento`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dnp`.`Departamento` ;

CREATE  TABLE IF NOT EXISTS `dnp`.`Departamento` (
  `IdDepartamento` INT(11) NOT NULL AUTO_INCREMENT ,
  `Nombre` VARCHAR(200) NOT NULL ,
  `IdOwn` INT(11) NOT NULL COMMENT 'Id of the User who created' ,
  PRIMARY KEY (`IdDepartamento`) ,
  UNIQUE INDEX `Name` (`Nombre` ASC) ,
  INDEX `fk_Departamento_1` (`IdOwn` ASC) ,
  CONSTRAINT `fk_Departamento_1`
    FOREIGN KEY (`IdOwn` )
    REFERENCES `dnp`.`Login` (`IdLogin` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 33
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `dnp`.`Rol`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dnp`.`Rol` ;

CREATE  TABLE IF NOT EXISTS `dnp`.`Rol` (
  `idRol` INT(11) NOT NULL AUTO_INCREMENT ,
  `Nombre` VARCHAR(85) NOT NULL ,
  `Descripcion` VARCHAR(255) NULL DEFAULT NULL ,
  PRIMARY KEY (`idRol`) ,
  UNIQUE INDEX `Name_UNIQUE` (`Nombre` ASC) )
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `dnp`.`DatosUsuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dnp`.`DatosUsuarios` ;

CREATE  TABLE IF NOT EXISTS `dnp`.`DatosUsuarios` (
  `IdUsersData` INT(11) NOT NULL AUTO_INCREMENT ,
  `Nombre` VARCHAR(200) NOT NULL ,
  `NickName` VARCHAR(80) NOT NULL ,
  `Correo` VARCHAR(200) NULL DEFAULT NULL ,
  `IdDepartamento` INT(11) NOT NULL ,
  `IdInitialRoll` INT(11) NULL DEFAULT NULL ,
  `Telefono` VARCHAR(45) NULL DEFAULT NULL ,
  PRIMARY KEY (`IdUsersData`) ,
  INDEX `IdCompany` (`IdDepartamento` ASC) ,
  INDEX `IdUsersData` (`IdUsersData` ASC) ,
  INDEX `IdInitialRoll` (`IdInitialRoll` ASC) ,
  CONSTRAINT `IdCompany`
    FOREIGN KEY (`IdDepartamento` )
    REFERENCES `dnp`.`Departamento` (`IdDepartamento` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `IdInitialRoll`
    FOREIGN KEY (`IdInitialRoll` )
    REFERENCES `dnp`.`Rol` (`idRol` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `IdUsersData`
    FOREIGN KEY (`IdUsersData` )
    REFERENCES `dnp`.`Login` (`IdLogin` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `dnp`.`Funciones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dnp`.`Funciones` ;

CREATE  TABLE IF NOT EXISTS `dnp`.`Funciones` (
  `idFuncion` INT(11) NOT NULL AUTO_INCREMENT ,
  `Nombre` VARCHAR(85) NOT NULL ,
  `Descripcion` VARCHAR(255) NOT NULL ,
  `ControlAsociado` VARCHAR(120) NULL DEFAULT NULL ,
  PRIMARY KEY (`idFuncion`) ,
  UNIQUE INDEX `Name_UNIQUE` (`Nombre` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `dnp`.`Permisos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dnp`.`Permisos` ;

CREATE  TABLE IF NOT EXISTS `dnp`.`Permisos` (
  `IdPermiso` INT(11) NOT NULL AUTO_INCREMENT ,
  `idFuncion` INT(11) NOT NULL ,
  `IdLogin` INT(11) NOT NULL ,
  PRIMARY KEY (`IdPermiso`) ,
  INDEX `fk_Function_has_Login_Login1` (`IdLogin` ASC) ,
  INDEX `fk_Function_has_Login_Function1` (`idFuncion` ASC) ,
  CONSTRAINT `fk_Function_has_Login_Function1`
    FOREIGN KEY (`idFuncion` )
    REFERENCES `dnp`.`Funciones` (`idFuncion` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Function_has_Login_Login1`
    FOREIGN KEY (`IdLogin` )
    REFERENCES `dnp`.`Login` (`IdLogin` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `dnp`.`RelacionUsuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dnp`.`RelacionUsuarios` ;

CREATE  TABLE IF NOT EXISTS `dnp`.`RelacionUsuarios` (
  `idRelationUsers` INT(11) NOT NULL AUTO_INCREMENT ,
  `IdUsuarioHijo` INT(11) NULL DEFAULT NULL ,
  `IdUsuarioPadre` INT(11) NULL DEFAULT NULL ,
  PRIMARY KEY (`idRelationUsers`) ,
  INDEX `fk_RelacionUsuarios_1` (`IdUsuarioHijo` ASC) ,
  INDEX `fk_RelacionUsuarios_2` (`IdUsuarioPadre` ASC) ,
  CONSTRAINT `fk_RelacionUsuarios_1`
    FOREIGN KEY (`IdUsuarioHijo` )
    REFERENCES `dnp`.`Login` (`IdLogin` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_RelacionUsuarios_2`
    FOREIGN KEY (`IdUsuarioPadre` )
    REFERENCES `dnp`.`Login` (`IdLogin` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `dnp`.`Rol_has_Function`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dnp`.`Rol_has_Function` ;

CREATE  TABLE IF NOT EXISTS `dnp`.`Rol_has_Function` (
  `IdRol_has_Function` INT(11) NOT NULL AUTO_INCREMENT ,
  `idRol` INT(11) NOT NULL ,
  `idFuncion` INT(11) NOT NULL ,
  PRIMARY KEY (`IdRol_has_Function`) ,
  INDEX `fk_Roll_has_Function_Function1` (`idFuncion` ASC) ,
  INDEX `fk_Roll_has_Function_Roll1` (`idRol` ASC) ,
  CONSTRAINT `fk_Roll_has_Function_Function1`
    FOREIGN KEY (`idFuncion` )
    REFERENCES `dnp`.`Funciones` (`idFuncion` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Roll_has_Function_Roll1`
    FOREIGN KEY (`idRol` )
    REFERENCES `dnp`.`Rol` (`idRol` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `dnp`.`Rol_has_Rol`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dnp`.`Rol_has_Rol` ;

CREATE  TABLE IF NOT EXISTS `dnp`.`Rol_has_Rol` (
  `idRecord` INT(11) NOT NULL AUTO_INCREMENT ,
  `IdRolParent` INT(11) NULL DEFAULT NULL ,
  `IdRolChildren` INT(11) NULL DEFAULT NULL ,
  PRIMARY KEY (`idRecord`) ,
  INDEX `IdRollParent` (`IdRolParent` ASC) ,
  INDEX `IdRollChildren` (`IdRolChildren` ASC) ,
  CONSTRAINT `IdRollChildren`
    FOREIGN KEY (`IdRolChildren` )
    REFERENCES `dnp`.`Rol` (`idRol` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `IdRollParent`
    FOREIGN KEY (`IdRolParent` )
    REFERENCES `dnp`.`Rol` (`idRol` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `dnp`.`Transacciones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dnp`.`Transacciones` ;

CREATE  TABLE IF NOT EXISTS `dnp`.`Transacciones` (
  `idUsersTransactions` INT(11) NOT NULL AUTO_INCREMENT ,
  `IdUsuario` INT(11) NOT NULL ,
  `IdUsuarioMaestro` INT(11) NOT NULL ,
  `Operacion` VARCHAR(255) NOT NULL COMMENT 'Create\nUpdate\nDeacti' ,
  `Fecha` DATETIME NOT NULL ,
  PRIMARY KEY (`idUsersTransactions`) ,
  INDEX `fk_Transacciones_1` (`IdUsuario` ASC) ,
  INDEX `fk_Transacciones_2` (`IdUsuarioMaestro` ASC) ,
  CONSTRAINT `fk_Transacciones_1`
    FOREIGN KEY (`IdUsuario` )
    REFERENCES `dnp`.`Login` (`IdLogin` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Transacciones_2`
    FOREIGN KEY (`IdUsuarioMaestro` )
    REFERENCES `dnp`.`Login` (`IdLogin` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 19
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `dnp`.`Sector`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dnp`.`Sector` ;

CREATE  TABLE IF NOT EXISTS `dnp`.`Sector` (
  `idSector` INT NOT NULL AUTO_INCREMENT ,
  `Nombre` VARCHAR(255) NOT NULL ,
  PRIMARY KEY (`idSector`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dnp`.`Proyectos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dnp`.`Proyectos` ;

CREATE  TABLE IF NOT EXISTS `dnp`.`Proyectos` (
  `IdProyecto` INT NOT NULL AUTO_INCREMENT ,
  `FichaNum` INT(11) NOT NULL ,
  `Nombre` VARCHAR(255) NULL ,
  PRIMARY KEY (`IdProyecto`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dnp`.`ProyectoDatos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dnp`.`ProyectoDatos` ;

CREATE  TABLE IF NOT EXISTS `dnp`.`ProyectoDatos` (
  `IdProyecto` INT NOT NULL ,
  `IdSector` INT(11) NOT NULL ,
  `FechaInicio` DATE NULL ,
  `FechaFin` DATE NULL ,
  `Entidad` VARCHAR(255) NULL ,
  `Expediente` VARCHAR(60) NULL ,
  `Consultora` VARCHAR(255) NULL ,
  `CostoTotal` DOUBLE NULL ,
  `Fuente` VARCHAR(50) NULL ,
  INDEX `fk_Proyecto_Datos_Proyectos1` (`IdProyecto` ASC) ,
  PRIMARY KEY (`IdProyecto`) ,
  INDEX `fk_Proyecto_Datos_1` (`IdSector` ASC) ,
  CONSTRAINT `fk_Proyecto_Datos_Proyectos1`
    FOREIGN KEY (`IdProyecto` )
    REFERENCES `dnp`.`Proyectos` (`IdProyecto` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Proyecto_Datos_1`
    FOREIGN KEY (`IdSector` )
    REFERENCES `dnp`.`Sector` (`idSector` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dnp`.`Login_has_Proyectos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dnp`.`Login_has_Proyectos` ;

CREATE  TABLE IF NOT EXISTS `dnp`.`Login_has_Proyectos` (
  `Login_IdLogin` INT(11) NOT NULL ,
  `Proyectos_IdProyecto` INT NOT NULL ,
  PRIMARY KEY (`Login_IdLogin`, `Proyectos_IdProyecto`) ,
  INDEX `fk_Login_has_Proyectos_Proyectos1` (`Proyectos_IdProyecto` ASC) ,
  INDEX `fk_Login_has_Proyectos_Login1` (`Login_IdLogin` ASC) ,
  CONSTRAINT `fk_Login_has_Proyectos_Login1`
    FOREIGN KEY (`Login_IdLogin` )
    REFERENCES `dnp`.`Login` (`IdLogin` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Login_has_Proyectos_Proyectos1`
    FOREIGN KEY (`Proyectos_IdProyecto` )
    REFERENCES `dnp`.`Proyectos` (`IdProyecto` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `dnp`.`Descripcion`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dnp`.`Descripcion` ;

CREATE  TABLE IF NOT EXISTS `dnp`.`Descripcion` (
  `IdProyecto` INT NOT NULL ,
  `ObjetivoGeneral` LONGTEXT NULL ,
  `ObjetivosEspecificos` LONGTEXT NULL ,
  `Alcance` LONGTEXT NULL ,
  `Productos` LONGTEXT NULL ,
  `Resultados` LONGTEXT NULL ,
  `Inversion` DOUBLE NULL ,
  `Herramientas` LONGTEXT NULL ,
  `MejoresPracticas` LONGTEXT NULL ,
  `Observaciones` LONGTEXT NULL ,
  PRIMARY KEY (`IdProyecto`) ,
  INDEX `fk_Descripcion_1` (`IdProyecto` ASC) ,
  CONSTRAINT `fk_Descripcion_1`
    FOREIGN KEY (`IdProyecto` )
    REFERENCES `dnp`.`Proyectos` (`IdProyecto` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `dnp`.`Login`
-- -----------------------------------------------------
START TRANSACTION;
USE `dnp`;
INSERT INTO `dnp`.`Login` (`IdLogin`, `Usuario`, `Clave`, `Estado`) VALUES (1, 'Admin', '1c7a92ae351d4e21ebdfb897508f59d6', 'Activo');

COMMIT;

-- -----------------------------------------------------
-- Data for table `dnp`.`Departamento`
-- -----------------------------------------------------
START TRANSACTION;
USE `dnp`;
INSERT INTO `dnp`.`Departamento` (`IdDepartamento`, `Nombre`, `IdOwn`) VALUES (1, 'Admin', 1);

COMMIT;

-- -----------------------------------------------------
-- Data for table `dnp`.`Rol`
-- -----------------------------------------------------
START TRANSACTION;
USE `dnp`;
INSERT INTO `dnp`.`Rol` (`idRol`, `Nombre`, `Descripcion`) VALUES (1, 'Administrador', 'Administrador');

COMMIT;

-- -----------------------------------------------------
-- Data for table `dnp`.`DatosUsuarios`
-- -----------------------------------------------------
START TRANSACTION;
USE `dnp`;
INSERT INTO `dnp`.`DatosUsuarios` (`IdUsersData`, `Nombre`, `NickName`, `Correo`, `IdDepartamento`, `IdInitialRoll`, `Telefono`) VALUES (1, 'Admin', 'Administrador', 'joespinosa@cra.com.co', 1, 1, '');

COMMIT;

-- -----------------------------------------------------
-- Data for table `dnp`.`Transacciones`
-- -----------------------------------------------------
START TRANSACTION;
USE `dnp`;
INSERT INTO `dnp`.`Transacciones` (`idUsersTransactions`, `IdUsuario`, `IdUsuarioMaestro`, `Operacion`, `Fecha`) VALUES (1, 1, 1, 'Creación Administrador', '2013-08-13 18:22:00');

COMMIT;
