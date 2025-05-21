/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const DataTypes = require('sequelize').DataTypes

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
        return Promise.all([
            queryInterface.sequelize.query(`INSERT [dbo].[organisation] ([id], [organisation], [vatnumber], [active], [contactperson], [contactemail], [contactphone], [streetandnr], [city], [zipcode]) 
            VALUES (N'11111aa1-11a1-11a1-111a-11aaa111aa11', N'Acsis BVBA', N'BE 0472.355.851', 1, N'Ortwin Van Leuven', N'ortwin@acsis.be', N'+32 477 27 19 21', N'Kampenstraat 70', N'Borsbeke', N'9552');
            SET IDENTITY_INSERT [dbo].[enum] ON 
            INSERT [dbo].[enum] ([id], [enum], [organisation], [value], [fixed]) VALUES (20, N'language', N'11111aa1-11a1-11a1-111a-11aaa111aa11', N'nl', 1)
            INSERT [dbo].[enum] ([id], [enum], [organisation], [value], [fixed]) VALUES (21, N'language', N'11111aa1-11a1-11a1-111a-11aaa111aa11', N'fr', 1)
            INSERT [dbo].[enum] ([id], [enum], [organisation], [value], [fixed]) VALUES (22, N'language', N'11111aa1-11a1-11a1-111a-11aaa111aa11', N'en', 1)
            SET IDENTITY_INSERT [dbo].[enum] OFF
            SET IDENTITY_INSERT [dbo].[member] ON 
            INSERT [dbo].[member] ([id], [name], [classification], [firstname], [email], [isactive], [organisation], [streetandnr], [zipcode], [city], [mobile], [isadmin], [membersince], [language], [password])
            VALUES (1, N'Van Leuven', NULL, N'Ortwin', N'info@acsis.be', 1, N'11111aa1-11a1-11a1-111a-11aaa111aa11', N'Kampenstraat 70', N'9552', N'Borsbeke', N'+32477271921', 1,	GETDATE(),	20, N'$2b$10$Bif5co6ViwASADKWirSP1ebB65kFixtUMrwpEiovudMRsa9.Kc15y');
            SET IDENTITY_INSERT [dbo].[member] OFF`, { transaction: t }),
        ]);
      });
  },
};