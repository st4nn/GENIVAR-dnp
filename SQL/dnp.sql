SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';

CREATE SCHEMA IF NOT EXISTS `sgigeniv_dnp` DEFAULT CHARACTER SET latin1 ;
USE `sgigeniv_dnp` ;

-- -----------------------------------------------------
-- Table `Login`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Login` ;

CREATE  TABLE IF NOT EXISTS `Login` (
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
-- Table `Departamento`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Departamento` ;

CREATE  TABLE IF NOT EXISTS `Departamento` (
  `IdDepartamento` INT(11) NOT NULL AUTO_INCREMENT ,
  `Nombre` VARCHAR(200) NOT NULL ,
  `IdOwn` INT(11) NOT NULL COMMENT 'Id of the User who created' ,
  PRIMARY KEY (`IdDepartamento`) ,
  UNIQUE INDEX `Name` (`Nombre` ASC) ,
  INDEX `fk_Departamento_1` (`IdOwn` ASC) ,
  CONSTRAINT `fk_Departamento_1`
    FOREIGN KEY (`IdOwn` )
    REFERENCES `Login` (`IdLogin` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 33
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `Rol`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Rol` ;

CREATE  TABLE IF NOT EXISTS `Rol` (
  `idRol` INT(11) NOT NULL AUTO_INCREMENT ,
  `Nombre` VARCHAR(85) NOT NULL ,
  `Descripcion` VARCHAR(255) NULL DEFAULT NULL ,
  PRIMARY KEY (`idRol`) ,
  UNIQUE INDEX `Name_UNIQUE` (`Nombre` ASC) )
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `DatosUsuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DatosUsuarios` ;

CREATE  TABLE IF NOT EXISTS `DatosUsuarios` (
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
    REFERENCES `Departamento` (`IdDepartamento` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `IdInitialRoll`
    FOREIGN KEY (`IdInitialRoll` )
    REFERENCES `Rol` (`idRol` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `IdUsersData`
    FOREIGN KEY (`IdUsersData` )
    REFERENCES `Login` (`IdLogin` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `Funciones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Funciones` ;

CREATE  TABLE IF NOT EXISTS `Funciones` (
  `idFuncion` INT(11) NOT NULL AUTO_INCREMENT ,
  `Nombre` VARCHAR(85) NOT NULL ,
  `Descripcion` VARCHAR(255) NOT NULL ,
  `ControlAsociado` VARCHAR(120) NULL DEFAULT NULL ,
  PRIMARY KEY (`idFuncion`) ,
  UNIQUE INDEX `Name_UNIQUE` (`Nombre` ASC) )
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `Permisos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Permisos` ;

CREATE  TABLE IF NOT EXISTS `Permisos` (
  `IdPermiso` INT(11) NOT NULL AUTO_INCREMENT ,
  `idFuncion` INT(11) NOT NULL ,
  `IdLogin` INT(11) NOT NULL ,
  PRIMARY KEY (`IdPermiso`) ,
  INDEX `fk_Function_has_Login_Login1` (`IdLogin` ASC) ,
  INDEX `fk_Function_has_Login_Function1` (`idFuncion` ASC) ,
  CONSTRAINT `fk_Function_has_Login_Function1`
    FOREIGN KEY (`idFuncion` )
    REFERENCES `Funciones` (`idFuncion` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Function_has_Login_Login1`
    FOREIGN KEY (`IdLogin` )
    REFERENCES `Login` (`IdLogin` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `RelacionUsuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `RelacionUsuarios` ;

CREATE  TABLE IF NOT EXISTS `RelacionUsuarios` (
  `idRelationUsers` INT(11) NOT NULL AUTO_INCREMENT ,
  `IdUsuarioHijo` INT(11) NULL DEFAULT NULL ,
  `IdUsuarioPadre` INT(11) NULL DEFAULT NULL ,
  PRIMARY KEY (`idRelationUsers`) ,
  INDEX `fk_RelacionUsuarios_1` (`IdUsuarioHijo` ASC) ,
  INDEX `fk_RelacionUsuarios_2` (`IdUsuarioPadre` ASC) ,
  CONSTRAINT `fk_RelacionUsuarios_1`
    FOREIGN KEY (`IdUsuarioHijo` )
    REFERENCES `Login` (`IdLogin` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_RelacionUsuarios_2`
    FOREIGN KEY (`IdUsuarioPadre` )
    REFERENCES `Login` (`IdLogin` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `Rol_has_Function`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Rol_has_Function` ;

CREATE  TABLE IF NOT EXISTS `Rol_has_Function` (
  `IdRol_has_Function` INT(11) NOT NULL AUTO_INCREMENT ,
  `idRol` INT(11) NOT NULL ,
  `idFuncion` INT(11) NOT NULL ,
  PRIMARY KEY (`IdRol_has_Function`) ,
  INDEX `fk_Roll_has_Function_Function1` (`idFuncion` ASC) ,
  INDEX `fk_Roll_has_Function_Roll1` (`idRol` ASC) ,
  CONSTRAINT `fk_Roll_has_Function_Function1`
    FOREIGN KEY (`idFuncion` )
    REFERENCES `Funciones` (`idFuncion` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Roll_has_Function_Roll1`
    FOREIGN KEY (`idRol` )
    REFERENCES `Rol` (`idRol` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `Rol_has_Rol`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Rol_has_Rol` ;

CREATE  TABLE IF NOT EXISTS `Rol_has_Rol` (
  `idRecord` INT(11) NOT NULL AUTO_INCREMENT ,
  `IdRolParent` INT(11) NULL DEFAULT NULL ,
  `IdRolChildren` INT(11) NULL DEFAULT NULL ,
  PRIMARY KEY (`idRecord`) ,
  INDEX `IdRollParent` (`IdRolParent` ASC) ,
  INDEX `IdRollChildren` (`IdRolChildren` ASC) ,
  CONSTRAINT `IdRollChildren`
    FOREIGN KEY (`IdRolChildren` )
    REFERENCES `Rol` (`idRol` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `IdRollParent`
    FOREIGN KEY (`IdRolParent` )
    REFERENCES `Rol` (`idRol` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `Transacciones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Transacciones` ;

CREATE  TABLE IF NOT EXISTS `Transacciones` (
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
    REFERENCES `Login` (`IdLogin` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Transacciones_2`
    FOREIGN KEY (`IdUsuarioMaestro` )
    REFERENCES `Login` (`IdLogin` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 19
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `Sector`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Sector` ;

CREATE  TABLE IF NOT EXISTS `Sector` (
  `idSector` INT NOT NULL AUTO_INCREMENT ,
  `Nombre` VARCHAR(255) NOT NULL ,
  PRIMARY KEY (`idSector`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Proyectos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Proyectos` ;

CREATE  TABLE IF NOT EXISTS `Proyectos` (
  `IdProyecto` INT NOT NULL AUTO_INCREMENT ,
  `FichaNum` VARCHAR(18) NOT NULL ,
  `Nombre` VARCHAR(255) NULL ,
  PRIMARY KEY (`IdProyecto`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ProyectoDatos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ProyectoDatos` ;

CREATE  TABLE IF NOT EXISTS `ProyectoDatos` (
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
    REFERENCES `Proyectos` (`IdProyecto` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Proyecto_Datos_1`
    FOREIGN KEY (`IdSector` )
    REFERENCES `Sector` (`idSector` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Login_has_Proyectos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Login_has_Proyectos` ;

CREATE  TABLE IF NOT EXISTS `Login_has_Proyectos` (
  `Login_IdLogin` INT(11) NOT NULL ,
  `Proyectos_IdProyecto` INT NOT NULL ,
  PRIMARY KEY (`Login_IdLogin`, `Proyectos_IdProyecto`) ,
  INDEX `fk_Login_has_Proyectos_Proyectos1` (`Proyectos_IdProyecto` ASC) ,
  INDEX `fk_Login_has_Proyectos_Login1` (`Login_IdLogin` ASC) ,
  CONSTRAINT `fk_Login_has_Proyectos_Login1`
    FOREIGN KEY (`Login_IdLogin` )
    REFERENCES `Login` (`IdLogin` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Login_has_Proyectos_Proyectos1`
    FOREIGN KEY (`Proyectos_IdProyecto` )
    REFERENCES `Proyectos` (`IdProyecto` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `Descripcion`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Descripcion` ;

CREATE  TABLE IF NOT EXISTS `Descripcion` (
  `IdProyecto` INT NOT NULL ,
  `ObjetivoGeneral` LONGTEXT NULL ,
  `ObjetivosEspecificos` LONGTEXT NULL ,
  `Alcance` LONGTEXT NULL ,
  `Productos` LONGTEXT NULL ,
  `Resultados` LONGTEXT NULL ,
  `Inversion` LONGTEXT NULL ,
  `Herramientas` LONGTEXT NULL ,
  `MejoresPracticas` LONGTEXT NULL ,
  `Observaciones` LONGTEXT NULL ,
  PRIMARY KEY (`IdProyecto`) ,
  INDEX `fk_Descripcion_1` (`IdProyecto` ASC) ,
  CONSTRAINT `fk_Descripcion_1`
    FOREIGN KEY (`IdProyecto` )
    REFERENCES `Proyectos` (`IdProyecto` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Contratos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Contratos` ;

CREATE  TABLE IF NOT EXISTS `Contratos` (
  `idContrato` INT NOT NULL AUTO_INCREMENT ,
  `NumContrato` VARCHAR(45) NULL ,
  `FechaDeFirma` VARCHAR(45) NULL ,
  `Contratista` VARCHAR(120) NULL ,
  `Identificacion` VARCHAR(60) NULL ,
  `ConfiguracionJuridica` VARCHAR(45) NULL ,
  `CapacidadDelContratista` VARCHAR(45) NULL ,
  `ModalidadDelProceso` VARCHAR(45) NULL ,
  `ClaseDeContrato` VARCHAR(55) NULL ,
  `ObjetoSuscripcion` LONGTEXT NULL ,
  `ValorInicial` DOUBLE NULL ,
  `FechaRegistroPtaInicial` VARCHAR(60) NULL ,
  `PlazoEjecucionInicial` VARCHAR(45) NULL ,
  `Dependencia` VARCHAR(100) NULL ,
  `FechaInicio` VARCHAR(60) NULL ,
  `FechaTerminacion` VARCHAR(60) NULL ,
  `BancaMultilateral` VARCHAR(45) NULL ,
  PRIMARY KEY (`idContrato`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Contratos_has_Proyectos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Contratos_has_Proyectos` ;

CREATE  TABLE IF NOT EXISTS `Contratos_has_Proyectos` (
  `Contratos_idContrato` INT NOT NULL ,
  `Proyectos_IdProyecto` INT NOT NULL ,
  PRIMARY KEY (`Contratos_idContrato`, `Proyectos_IdProyecto`) ,
  INDEX `fk_Contratos_has_Proyectos_Proyectos1` (`Proyectos_IdProyecto` ASC) ,
  INDEX `fk_Contratos_has_Proyectos_Contratos1` (`Contratos_idContrato` ASC) ,
  CONSTRAINT `fk_Contratos_has_Proyectos_Contratos1`
    FOREIGN KEY (`Contratos_idContrato` )
    REFERENCES `Contratos` (`idContrato` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Contratos_has_Proyectos_Proyectos1`
    FOREIGN KEY (`Proyectos_IdProyecto` )
    REFERENCES `Proyectos` (`IdProyecto` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
